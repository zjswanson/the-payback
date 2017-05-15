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
    {debt1: 3, debt2: 2, debt3: 1}
  ]

    constructor(d3Service: D3Service) { //
      this.d3 = d3Service.getD3();
    }

    ngOnInit() {
      let d3 = this.d3;
      // this.drawStack();
      this.drawCircles();
    }

    drawStack() {
      let svg = this.d3.select('#draw-here')
                    .attr('width',500)
                    .attr('height',500);


      var colors = {debt1: 'blue', debt2: 'green', debt3: 'orange'};

      let stack = this.d3.stack().keys(["debt1","debt2","debt3"]);

      let series = stack(this.data);


      let groups = svg.selectAll('g')
        .data(series)
        .enter()
        .append('g')
        .attr('fill', function(d,i) {
          return colors[d.key];
        })
        .selectAll('rect')
        .data(function(d:any) {return d;})
        .enter().append('rect')
        .attr('y', function(d,i) {return d[0]*10;})
        .attr('height', function(d) {return (d[1]-d[0])*10;})
        .attr('x', function(d,i) {return 50*i;})
        .attr('width', 25)

    }

    drawCircles() {

      let dataset = [1,2,3,4,5,6,7,8,9];
      let svg = this.d3.select('#draw-here')
                    .attr('width',500)
                    .attr('height',500)
                    .append('g')
                    .attr('transform', "translate(250,250)");

      // let arc = this.d3.arc()
      // .innerRadius(50)
      // .outerRadius(70);
      //
      //
      // let pie = this.d3.pie();
      // let g = svg.selectAll('.arc')
      //   .data(pie(dataset))
      //   .enter().append('g')
      //   .attr("class", 'arc')
      //   .append('path')
      //   .attr('d', (d,i) => {
      //     let path = arc.startAngle(d.startAngle).endAngle(d.endAngle);
      //     return path;
      //   });

      let pie = this.d3.pie()(dataset);
      pie.forEach( (segment) => {
        let arc = this.d3.arc()
        .innerRadius(50)
        .outerRadius(70)
        .startAngle(segment.startAngle)
        .endAngle(segment.endAngle);
        console.log(arc);
        svg.append('path')
        .attr('d', arc);
      });


    }


}
