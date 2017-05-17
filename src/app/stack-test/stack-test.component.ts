import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleOrdinal, Transition } from 'd3-ng2-service';
import { FinanceService } from './../finance.service';
import { DrawingService } from './../drawing.service';

@Component({
  selector: 'app-stack-test',
  templateUrl: './stack-test.component.html',
  styleUrls: ['./stack-test.component.css'],
  providers: [FinanceService, DrawingService]
})
export class StackTestComponent implements OnInit {
  private d3: D3;
  private data: any[] = [
    {debt1: 5, debt2: 4, debt3: 3},
    {debt1: 4, debt2: 3, debt3: 2},
    {debt1: 3, debt2: 2, debt3: 1},
    {debt1: 2, debt2: 1, debt3: 0},
    {debt1: 1, debt2: 0, debt3: 0}
  ]
  private totalPayment:number = 0;
  private svg:any = null;
  private circleSelection:any = null;

    constructor(private d3Service: D3Service, private finance: FinanceService, private draw: DrawingService) { //
      this.d3 = d3Service.getD3();

    }

    ngOnInit() {
      let d3 = this.d3;
      this.svg = this.d3.select('#draw-here')
                    .attr('width',500)
                    .attr('height',500);
      this.circleSelection = this.svg.append('g')
      .attr('transform', "translate(250,250)");
      // this.drawStack();
      this.data = this.finance.randomDebtStack();
      this.drawCircles();
      // this.calculatePayment();


    }

    reDraw() {
      this.data = this.finance.randomDebtStack();
      this.draw.drawCircleStack(this.circleSelection,this.data);
    }

    calculatePayment() {
      let total = 0;
      this.data.forEach(function(object) {
        Object.keys(object).forEach(function(debt) {
          total += +debt;
        });
      });
      this.totalPayment = total;
    }


    randoColor() {
      let rand255 = function(){ return Math.floor(Math.random()*256)};
      let color = "rgb("+rand255()+","+rand255()+","+rand255()+")";
      return color;
    }

    drawStack() {
      let svg = this.svg;


      var colors = {debt1: 'blue', debt2: 'green', debt3: 'orange'};

      let stack = this.d3.stack().keys(Object.keys(this.data[0]));
      let series = stack(this.data);


      let groups = svg.selectAll('.bargroup')
        .data(series);
      groups.exit().remove();
      let rects = groups.enter()
        .append('g')
        .classed('bargroup',true)
        .merge(groups)
        .attr('fill', (d,i) =>{
          return this.randoColor();
        })
        .selectAll('rect')
        .data(function(d:any) {return d;})
      rects.exit().remove();
      rects
        .enter().append('rect')
        .merge(rects)
        .attr('y', function(d,i) {return d[0]*10;})
        .attr('height', function(d) {return (d[1]-d[0])*10;})
        .attr('x', function(d,i) {return 27*i;})
        .attr('width', 25)

    }



    drawCircles() {
      let svg = this.circleSelection;
      svg.selectAll('g').remove();
      var scaleAngle = this.d3.scaleLinear().domain([0,this.data.length]).range([0,(2*Math.PI)]);

      let stack = this.d3.stack().keys(Object.keys(this.data[0]))(this.data);

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
           .padRadius(5)
        );
    }


}
