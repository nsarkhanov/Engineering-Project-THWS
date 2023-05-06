import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { LiveService } from 'src/app/services/live.service';
import { DataService } from 'src/app/services/data.service';
import { DataPoint } from 'DataPoint';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.css'],
  host: {
    'class': 'graph'
  },
})
export class HistoricalChartComponent {
  @ViewChild('chart')
  chartElement: ElementRef;


  private svgElement: HTMLElement;
  private chartProps: any;
  curColor: string;
  @Output() curIcon: number = 1;
  private title: string;
  private allColors = ["violet", "red", "orange", "purple"];

  subscription: Subscription;
  data: DataPoint[];
  dataToPlot: DataPoint[];

  ngOnInit(): void { 
    // this.route.queryParams.subscribe(params => {
    // this.curColor = params['param1'];
    // this.title = params['param2'];
    // this.curIcon = params['param3'];
    // console.log("Param is: " + this.title);
    // });
    this.dataService.getInitialData()
      .subscribe(data => {
        this.data = data;
        this.dataToPlot = this.data.slice(0, 80);
        this.buildChart();
    });
    this.curColor = this.allColors[this.liveService.getCurrentDisplayGraph() - 1];

  }

  constructor(@Inject(LiveService) private liveService:LiveService,
              @Inject(DataService) private dataService: DataService,
              private route: ActivatedRoute) {
    this.subscription = this.liveService
        .onGraphChange()
        .subscribe((value) => { 
          console.log("HIIIIIIIER");
          switch(value) {
            case 1:
              this.curColor = 'violet';
              this.title = "Muse";
              this.curIcon = 1;
              console.log("case1")
              break;
            case 2:
              this.curColor = 'red';
              this.title = "Heart rate sensor";
              this.curIcon = 2;
              break;
            case 3:
              this.curColor = 'orange';
              this.title = "IMU sensor";
              this.curIcon = 3;
              break;
            case 4:
              this.curColor = 'purple';
              this.title = "Skin sensor";
              this.curIcon = 4;
              break;
          }
          this.updateChart()
        });

      
  }


  buildChart() {
    this.chartProps = {};
  
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
    .tickSizeOuter(0);;
  


    let _this = this;
  
    // Define the line
    var valueline = d3.line<DataPoint>()
      .x(function (d: DataPoint) {
          return _this.chartProps.x(d.x);
      })
      .y(function (d: DataPoint) { 
        return _this.chartProps.y(d.y); 
      });
  
    // Define the line
    // var valueline2 = d3.line<MarketPrice>()
    //   .x(function (d) {
    //     if (d.date instanceof Date) {
    //       return _this.chartProps.x(d.date.getTime());
    //     }
    //   })
    //   .y(function (d) { console.log('Open market'); return _this.chartProps.y(d.open); });
  
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
    this.chartProps.y.domain([0, d3.max(this.dataToPlot, function (d: DataPoint) {
      return d.y;
    })]);
  
    // Add the valueline2 path.
    // svg.append('path')
    //   .attr('class', 'line line2')
    //   .style('stroke', 'green')
    //   .style('fill', 'none')
    //   .attr('d', valueline2(_this.marketStatusToPlot));
  
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
      // .attr('class', 'y axis')
      // .attr('class', 'grid')
      // .call(yAxis)
      // .style('stroke', 'blue')
      // .style('stroke-width', 0.5);;

    // # Maybe Title here (attached to graph and does very close) #
    // svg.append('text')
    //   .attr('class', 'title')
    //   .attr('x', width / 2)
    //   .attr('y', 0)
    //   .attr('text-anchor', 'middle')
    //   .text(this.title);
  

    // const bounds = svg.append("g")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // const boundedWidth = width - margin.left - margin.right;
    // const boundedHeight = height - margin.top - margin.bottom;
    // const dimensions = { width, height, margin, boundedWidth, boundedHeight };

    //hovering
    var tooltip = d3.select(this.chartElement.nativeElement)
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    // .style('z-index', '10')
    // .style('opacity', 1)
    // .style('background-color', 'white')
    // .style('padding', '10px')
    .style('border', '1px solid black')
    .style('border-radius', '5px');

    var tooltipCircle = svg
    .append('circle')
    .attr("class", "tooltip-circle")
    .attr("r", 5)
    .style("fill", "steelblue")
    .style("opacity", 0);

    // .style('z-index', '10')
    // .style('opacity', 1)
    // .style('background-color', 'white')
    // .style('padding', '10px')
    // .style('border', '1px solid black')
    // .style('border-radius', '5px');

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
        var mouseX = d3.pointer(event)[0] ;
        var mouseY = d3.pointer(event)[1];
        
        // Convert the x and y coordinates of the mouse pointer to their corresponding data values on the chart
        var x0 = _this.chartProps.x.invert(mouseX) - _this.chartProps.x.invert(198);
        var y0 = _this.chartProps.y.invert(mouseY);
        const path = d3.select('path.line');
        const pathData = path.node().getAttribute('d');
        const firstPoint = pathData.match(/[-+]?\d*\.\d+|\d+/g);
        const x = firstPoint[0];
        const y = firstPoint[1];
        const i = closestIndex(x0, _this.dataToPlot);
        var d = _this.dataToPlot[i];

        // Set the content and position of the tooltip based on the closest data point to the x value of the mouse pointer
        tooltip.html('Value: ' + d.y)
          .style('left', (event.pageX-270) + 'px')
          .style('top', (event.pageY -100) + 'px');
        
        tooltip.style('opacity', 1);  

        tooltipCircle
        .attr("cx", _this.chartProps.x(d.x))
        .attr("cy", _this.chartProps.y(d.y))
        .style("opacity", 1);
        // svg.append("circle")
        //   .attr("class", "circle")
        //   .attr("cx", d.x) // set the x-coordinate of the center of the circle
        //   .attr("cy", d.y) // set the y-coordinate of the center of the circle
        //   .attr("r", 4); // set the radius of the circle

      })
      .on('mouseout', function () {
        // Set the opacity of the tooltip back to 0 (i.e. hide it)
        tooltip.style('opacity', 0);
      })

      
      
        // const xAxisLine = bounds
        // .append("g")
        // .append("rect")
        // .attr("class", "dotted")
        // .attr("stroke-width", "1px")
        // .attr("width", ".5px")
        // .attr("height", dimensions.boundedHeight);

        // bounds.on('mousemove', function(event) {
        //   // Get the x-coordinate of the mouse pointer relative to the SVG element
        //   const mouseX = d3.pointer(event)[0];
        
        //   // Update the position of the xAxisLine
        //   // xAxisLine.attr("transform", `translate(${mouseX}, 0)`);
        // });





    
    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    // this.chartProps.valueline2 = valueline2;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;

    
  }

  updateChart() {
    console.log("Update Chart called");
    this.chartProps.svg.select('path').style('stroke', this.curColor);
    // this.chartProps.svg.select('.title')
    //   .text(this.title);
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

// function compareDatesWithNumber(date, date2) {
//   console.log("date is: " + date.date.getTime() + " number is: " + date2);
//   return date.date.getTime() - date2.getTime();
// }

// function compareDates(date, number) {
//   console.log("date is: " + date.date.getTime() + " number is: " + number);
//   return date.date.getTime() - new Date(number).getTime();
// }
