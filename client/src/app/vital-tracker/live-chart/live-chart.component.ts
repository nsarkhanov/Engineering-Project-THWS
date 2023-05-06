import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import { DataPoint } from 'DataPoint';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-live-chart',
  templateUrl: './live-chart.component.html',
  styleUrls: ['./live-chart.component.css'],
  host: {
    'class': 'graph'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveChartComponent {
  @ViewChild('chart')
  chartElement: ElementRef;

  parseDate = d3.timeParse('%d-%m-%Y');

  data: DataPoint[];
  private dataToPlot: DataPoint[];
  
  
  private svgElement: HTMLElement;
  private chartProps: any;
  private curColor: string;
  private title: string;
  private allColors = ["violet", "red", "orange", "purple"];


  subscription: Subscription;

  ngOnInit(): void { 
    // this.chartProps = {}
    this.dataService.getInitialData()
      .subscribe(prices => {
        this.data = prices;
        this.dataToPlot = this.data.slice(0, 80);
        this.buildChart();
        console.log(this.dataToPlot)

        let dataUpdateObservable =  this.dataService.getUpdates();  // 1
        dataUpdateObservable.subscribe((latestStatus: DataPoint[]) => {  // 2
          this.data = latestStatus;  // 3
          
          this.updateChart();
        });  // 4

    });
    this.curColor = this.allColors[this.liveService.getCurrentDisplayGraph() - 1];


  }

  constructor(@Inject(LiveService) private liveService:LiveService,
              @Inject(DataService) private dataService: DataService) {
    this.subscription = this.liveService
      .onGraphChange()
      .subscribe((value) => { 
        console.log(value);
        switch(value) {
          case 1:
            this.curColor = 'violet';
            this.title = "Muse";
            break;
          case 2:
            this.curColor = 'red';
            this.title = "Heart rate sensor";
            break;
          case 3:
            this.curColor = 'orange';
            this.title = "IMU sensor";
            break;
          case 4:
            this.curColor = 'purple';
            this.title = "Skin sensor";
            break;
        }
      });

      this.subscription = this.liveService
      .onTitleChange()
      .subscribe((value) => { 
        console.log("NEw value is: " + value);
        this.title = value;
        this.updateChart()
    });

  }





  buildChart() {
    this.chartProps = {};
    console.log("Build chart called");
  
    // Set the dimensions of the canvas / graph
    var margin = { top: 50, right: 0, bottom: 30, left: 200 },
      width = 1000 - margin.left - margin.right,
      height = 470 - margin.top - margin.bottom;
  
    // Set the ranges
    this.chartProps.x = d3.scaleLinear().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);
  
    // Define the axes
    var xAxis = d3.axisBottom(this.chartProps.x)
      // .tickSizeInner(-height)
      // .tickSizeOuter(0);
    var yAxis = d3.axisLeft(this.chartProps.y)
    .ticks(5)
    .tickSizeInner(-width)
    .tickSizeOuter(0);
  


    let _this = this;
  
    // Define the line
    var valueline = d3.line<DataPoint>()
      .x(function (d: DataPoint) {
          return _this.chartProps.x(d.x);
      })
      .y(function (d: DataPoint) { 
        return _this.chartProps.y(d.y); 
      });
  
    var svg = d3.select(this.chartElement.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Scale the range of the data
    this.chartProps.x.domain(
      d3.extent(_this.dataToPlot, function (d: DataPoint) {
        return d.x;
      }));
    this.chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.y; }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.y; }))]);  
  
    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', this.curColor)
      .style('fill', 'none')
      .attr('d', valueline(_this.dataToPlot));
  
  
    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);
  
    // Add the Y Axis
    svg.append('g')
    .attr('class', 'grid')
    .call(yAxis);

    //hovering
    var tooltip = d3.select(this.chartElement.nativeElement)
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('border', '1px solid black')
    .style('border-radius', '5px');

    var tooltipCircle = svg
    .append('circle')
    .attr("class", "tooltip-circle")
    .attr("r", 5)
    .style("fill", "steelblue")
    .style("opacity", 0);

      // Select all elements with class "line" and add a mouseover event listener
      d3.select(this.chartElement.nativeElement)
      .on('mouseover', function () {
        // Set the opacity of the tooltip to 1 (i.e. make it visible)
        tooltip.style('opacity', 1);
      })
      .on('mousemove', function (event) {
        tooltip.style('opacity', 1);

        // Get the x and y coordinates of the mouse pointer relative to the SVG element
        var mouseX = d3.pointer(event)[0];
        var mouseY = d3.pointer(event)[1];
        var svgElement = document.getElementsByClassName("graph");
        var svgRect = svgElement[0].getBoundingClientRect();
        var svgElement2 = document.getElementsByClassName("chart-container");
        var svgRect2 = svgElement2[0].getBoundingClientRect();
        var svgElement3 = document.getElementsByClassName("container");
        var svgRect3 = svgElement3[0].getBoundingClientRect();
        // console.log("HHHHEY " +svgRect.left + ", " + svgRect2.left + ", " +svgRect3.left + ", " + d3.pointer(event)[0]) ;
        console.log(_this.chartProps.x(0))
        var mouseX = d3.pointer(event)[0] ;
        var mouseY = d3.pointer(event)[1] - svgRect.top;
        var minValuex = Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.x; }));

        // Convert the x and y coordinates of the mouse pointer to their corresponding data values on the chart
        var x0 = _this.chartProps.x.invert(mouseX - minValuex) -0.076;
        var y0 = _this.chartProps.y.invert(mouseY);
        const path = d3.select('path.line');
        const pathData = path.node().getAttribute('d');
        const firstPoint = pathData.match(/[-+]?\d*\.\d+|\d+/g);
        const x = firstPoint[0];
        const y = firstPoint[1];
        console.log("x0 : " + x0 + " base: " + _this.chartProps.x.invert(0) + " mouseX" + mouseX)
        const i = closestIndex(x0, _this.dataToPlot);
        // closest data point
        var d = _this.dataToPlot[i];
        console.log("i: " + i +" iiii: "  + _this.chartProps.x(d.x));

        // Set the content and position of the tooltip based on the closest data point to the x value of the mouse pointer
        tooltip.html('Value: ' + d.y)
          .style('left', (event.pageX-270) + 'px')
          .style('top', (event.pageY -100) + 'px');
        
        tooltip.style('opacity', 1);  

        tooltipCircle
        .attr("cx", _this.chartProps.x(d.x))
        .attr("cy", _this.chartProps.y(d.y))
        .style("opacity", 1);
      })
      .on('mouseout', function () {
        // Set the opacity of the tooltip back to 0 (i.e. hide it)
        tooltip.style('opacity', 0);
      })
    
    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    this.chartProps.tooltip = tooltip;
    this.chartProps.tooltipCicle = tooltipCircle
    this.chartProps.margin = margin;
    // this.chartProps.valueline2 = valueline2;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;

    
  }

  updateChart() {

    let _this = this;
    _this.dataToPlot = _this.data.slice(0, 80);
    // Scale the range of the data again
    
    var minValuex = Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.x; }));

    this.chartProps.x.domain(
      [minValuex, 
        Math.max.apply(Math, _this.dataToPlot.map(function(o) { return o.x; }))]);  

    var minValuey = Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.y; }));
    minValuey = Math.min(0, minValuey);
    this.chartProps.y.domain(
      [Math.min(minValuey, 0), 
        Math.max.apply(Math, _this.dataToPlot.map(function(o) { return o.y; }))]);  

    // Select the section we want to apply our changes to
    this.chartProps.svg.transition();


    // Make the changes to the line chart
    this.chartProps.svg.select('.line.line1') // update the line
      .attr('d', this.chartProps.valueline(this.dataToPlot));
  
    // this.chartProps.svg.select('.line.line2') // update the line
    //   .attr('d', this.chartProps.valueline2(this.marketStatusToPlot));
  
    this.chartProps.svg.select('.x.axis') // update x axis
      .call(this.chartProps.xAxis);
  
    this.chartProps.svg.select('.y.axis') // update y axis
      .call(this.chartProps.yAxis);


    this.chartProps.svg.select('path').style('stroke', this.curColor)

}


}

function closestIndex(num: number, arr: DataPoint[]) {
  let index = 0;
  let curMinDiff = Math.abs(num - arr[index].x);
  for (let val = 0; val < arr.length; val++) {
     let newdiff = Math.abs(num - arr[val].x);
     if (newdiff < curMinDiff) {
        curMinDiff = newdiff;
        index = val;
     };
  };
  return index;
}