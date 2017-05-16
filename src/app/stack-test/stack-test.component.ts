import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleOrdinal } from 'd3-ng2-service';

@Component({
  selector: 'app-stack-test',
  templateUrl: './stack-test.component.html',
  styleUrls: ['./stack-test.component.css']
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

    constructor(d3Service: D3Service) { //
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
      this.drawCircles();
      this.calculatePayment();


    }

    reDraw() {
      this.randoDebts();
      this.drawCircles();
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

    randoDebts() {
      let numDebts:number = Math.floor(Math.random()*10)+1;
      let numPayments:number = Math.floor(Math.random()*30)+1;
      let paymentArray = [];
      for (let j =1;j<=numPayments;j++) {
        let object:{} = {}
        for (let i=1;i<+numDebts;i++) {
          object['debt'+i] = Math.floor(Math.random()*5)+1;
        };
        paymentArray.push(object);
      };
      this.data = paymentArray;
      this.calculatePayment();
    }

    // drawStack() {
    //   let svg = this.svg;
    //
    //
    //   var colors = {debt1: 'blue', debt2: 'green', debt3: 'orange'};
    //
    //   let stack = this.d3.stack().keys(["debt1","debt2","debt3"]);
    //
    //   let series = stack(this.data);
    //
    //
    //   let groups = svg.selectAll('g')
    //     .data(series)
    //     .enter()
    //     .append('g')
    //     .attr('fill', function(d,i) {
    //       return colors[d.key];
    //     })
    //     .selectAll('rect')
    //     .data(function(d:any) {return d;})
    //     .enter().append('rect')
    //     .attr('y', function(d,i) {return d[0]*10;})
    //     .attr('height', function(d) {return (d[1]-d[0])*10;})
    //     .attr('x', function(d,i) {return 50*i;})
    //     .attr('width', 25)
    //
    // }

    randoColor() {
      let rand255 = function(){ return Math.floor(Math.random()*256)};
      let color = "rgb("+rand255()+","+rand255()+","+rand255()+")";
      return color;
    }

    drawCircles() {

      let dataset = [1,2,3,4,5,6,7,8,9];
      let svg = this.circleSelection;


      var colors = {debt1: 'blue', debt2: 'green', debt3: 'orange'};

      var scaleRadius = this.d3.scaleLinear().domain([0,this.data.length]).range([0,2*Math.PI]);

      let stack = this.d3.stack().keys( Object.keys(this.data[0]))(this.data);
      let groups = svg.selectAll('g')
       .data(stack);
       groups.exit().remove();
      let paths = groups.enter()
       .append('g')
       .merge(groups)
       .attr('fill', (d,i) => {
         return this.randoColor();
       })
       .selectAll('g')
       .data( (array):any=> {
         return array;
       })
       paths.exit().remove();
       paths.enter()
       .append('path')
       .merge(paths)
       .transition()
       .attr( "d", this.d3.arc()
         .innerRadius( (d) => {return d[0]*10;} )
           .outerRadius( (d) => {return d[1]*10;} )
           .startAngle( (d,i) => { return scaleRadius(i); } )
           .endAngle( (d,i) => { return scaleRadius(i+1); })
        );

        // svg.append('circle')
        //   .attr('fill','red')
        //   .attr('r', 40);
        // svg.append('text')
        //   .text("total Payment: "+this.totalPayment);

      // let pie = this.d3.pie()(dataset);
      // pie.forEach( (segment) => {
      //   let arc = this.d3.arc()
      //   .innerRadius(50)
      //   .outerRadius(70)
      //   .startAngle(segment.startAngle)
      //   .endAngle(segment.endAngle);
      //   svg.append('path')
      //   .attr('d', arc);
      // });
    }


}
