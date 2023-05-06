import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssemblyActionComponent } from './assembly-action/assembly-action.component';
import { AssemblySequencesComponent } from './assembly-sequences/assembly-sequences.component';
import { CriteriaCatalogueComponent } from './criteria-catalogue/criteria-catalogue.component';
import { CyclicTimeComponent } from './cyclic-time/cyclic-time.component';
import { HomeComponent } from './home/home.component';
import { PriorityMatrixComponent } from './priority-matrix/priority-matrix.component';
import { SkillMatrixComponent } from './skill-matrix/skill-matrix.component';
import { CapabiltiyLevelComponent } from './capability-level/capability-level.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { VitalTrackerComponent } from './vital-tracker/vital-tracker/vital-tracker.component';
import { AboutComponent } from './vital-tracker/about/about.component';
import { LiveChartComponent } from './vital-tracker/live-chart/live-chart.component';
import { HistoricalChartComponent } from './vital-tracker/historical-chart/historical-chart.component';
import { AuthGuard } from './vital-tracker/guard/auth.guard';
// import { HomeComponent_ } from './home/home.component';
import { LoginComponent } from './vital-tracker/login/login.component';
import { RegisterComponent } from './vital-tracker/register/register.component';
import { UserComponent } from './vital-tracker/user/user.component';


const APP_routes: Routes = [
  {path: "home", redirectTo: "home"},
  {path: "skill-matrix", component: SkillMatrixComponent},
  {path: "home", component: HomeComponent},
  {path: "assemblyAction", component: AssemblyActionComponent},
  {path: "priority_matrix", component: PriorityMatrixComponent},
  {path: "time", component: CyclicTimeComponent},
  {path: "criteria", component: CriteriaCatalogueComponent},
  {path: "suitability_level", component: CapabiltiyLevelComponent},
  {path: "assembly_sequences", component: AssemblySequencesComponent},
  {path: "scheduler", component: SchedulerComponent},
  { 
    path: 'vital-tracker', 
    children: [
      // {path:"Login",} add login page 
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user', component: UserComponent ,canActivate:[AuthGuard]},
      { path: '', component: HomeComponent ,canActivate:[AuthGuard]},
      // 
      { path: 'Sensors', component: AboutComponent },
      { path: 'LiveReport', component: LiveChartComponent },
      { path: 'HistoricalReport', component: HistoricalChartComponent }
    ]
  }
  // {path: "vital-tracker", component: VitalTrackerComponent}
];

export const routing = RouterModule.forRoot(APP_routes) 