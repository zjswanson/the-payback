import { Injectable } from '@angular/core';
import { D3Service, D3, Selection, ScaleOrdinal, Transition } from 'd3-ng2-service';
import { Debt } from './debt.model';

@Injectable()
export class DrawingService {
  private d3: D3;

  constructor(private d3Service: D3Service) { //

    this.d3 = d3Service.getD3();

  }

  randoColor() {
    let rand255 = function(){ return Math.floor(Math.random()*256)};
    let color = "rgb("+rand255()+","+rand255()+","+rand255()+")";
    return color;
  }

  drawCircle(selection, debtObject: Debt) {
    let svg = selection;
    let data = debtObject.balanceSchedule;
    let max = debtObject.balanceSchedule[0][debtObject.debtName];

    svg.selectAll('g').remove();

    var scaleAngle = this.d3.scaleLinear().domain([0,data.length]).range([0,(2*Math.PI)]);


    var scaleLength = this.d3.scaleLinear().domain([0, max]).range([0,220]);

    let stack = this.d3.stack().keys(Object.keys(data[0]))(data);

    let groups = svg.selectAll('g')
     .data(stack)
     .enter()
     .append('g')
     .attr('fill', (d,i) => {
       return this.randoColor();
     })
     .selectAll('g')
     .data( (array):any=> {
       return array;
     })
     .enter()
     .append('path')
     .attr( "d", this.d3.arc()
       .innerRadius( (d) => {return scaleLength(d[0])+20;} )
         .outerRadius( (d) => {return scaleLength(d[1])+20;} )
         .startAngle( (d,i) => { return scaleAngle(i); } )
         .endAngle( (d,i) => { return scaleAngle(i+1); })
         .padAngle(.5)
         .padRadius(5)
      );
  }

  drawCircleStack(selection, data) {
    let svg = selection;
    svg.selectAll('g').remove();
    var scaleAngle = this.d3.scaleLinear().domain([0,data.length]).range([0,(2*Math.PI)]);

    let stack = this.d3.stack().keys(Object.keys(data[0]))(data);

    let groups = svg.selectAll('g')
     .data(stack)
     .enter()
     .append('g')
     .attr('fill', (d,i) => {
       return this.randoColor();
     })
     .selectAll('g')
     .data( (array):any=> {
       return array;
     })
     .enter()
     .append('path')
     .attr( "d", this.d3.arc()
       .innerRadius( (d) => {return (d[0]*5)+20;} )
         .outerRadius( (d) => {return (d[1]*5)+20;} )
         .startAngle( (d,i) => { return scaleAngle(i); } )
         .endAngle( (d,i) => { return scaleAngle(i+1); })
         .padAngle(.5)
         .padRadius(2)
      );
  }


  }
