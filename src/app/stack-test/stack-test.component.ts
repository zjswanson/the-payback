import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

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
      this.drawStack();
      this.drawTableTest();
    }

    drawStack() {
      let svg = this.d3.select('#draw-here')
                    .attr('width',500)
                    .attr('height',500);

      let stack = this.d3.stack().keys(["debt1","debt2","debt3"]);

      let series = stack(this.data);
      console.log(series);

      let groups = svg.selectAll('g')
        .data(series)
        .enter()
        .append('g');

      let data = groups.selectAll('rect')
        .data(function(d:any) {return d;})
        .enter().append('rect')
        .attr('y', function(d,i) {return d[0]*10})
        .attr('height', function(d) {return d[1]*10})
        .attr('x', function(d,i) {return 25*i;})
        .attr('width', 25)
        .attr('fill', function(d,i) {
              return 'black';
            }
         );

        console.log(groups.data());
        console.log(data.data());

    }

    drawTableTest() {
            var matrix = [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
      ];

      var tr = this.d3.select("body")
        .append("table")
        .selectAll("tr")
        .data(matrix)
        .enter().append("tr");

      var td = tr.selectAll("td")
        .data(function(d) { return d; })
        .enter().append("td")
          .text(function(d) { return d; });
    }

}
