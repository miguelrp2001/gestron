import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { GestronRequest, User, Stats } from '../../interfaces/user';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GestronbackendService } from '../../services/gestronbackend.service';

@Component({
  selector: 'app-dash-index',
  templateUrl: './dash-index.component.html',
  styleUrls: ['./dash-index.component.css']
})
export class DashIndexComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  loading = true;
  stats: Stats = {} as Stats;

  constructor(private authState: AuthStateService, private router: Router, private authService: AuthService, private gestronapi: GestronbackendService) {

    this.authState.userAuthState.subscribe(r => {
      if (!r) {
        this.router.navigate(['login']);
      }
    })

    this.gestronapi.getDashboard().subscribe((res: GestronRequest) => {
      this.loading = false;
      this.stats = res.data.stats || {} as Stats;
      this.pieChartData.datasets[0].data = [this.stats.ticketsCobrados, this.stats.ticketsAnulados, this.stats.ticketsPendientes];
      this.stats.lineasPorTrabajador.forEach(l => {
        if (this.barChartData.labels) {
          this.barChartData.labels.push(l.nombre);
        }
        this.barChartData.datasets[0].data.push(l.anulaciones);
        this.barChartData.datasets[1].data.push(l.marcadas);
      });
      this.chart?.update();
    });

  }


  public user(): User {
    return this.authService.getUsuario();
  }

  ngOnInit(): void {
  }

  public ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: [['Cobrados'], ['Anulados'], ['Pendientes']],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(42, 157, 143, 0.7)',
        'rgba(231, 111, 81, 0.7)',
        'rgba(233, 196, 106, 0.7)'
      ],
      borderColor: [
        'rgba(42, 157, 143, 1)',
        'rgba(231, 111, 81, 1)',
        'rgba(233, 196, 106, 1)'
      ],
      hoverBorderColor: [
        'rgba(42, 157, 143, 1)',
        'rgba(231, 111, 81, 1)',
        'rgba(233, 196, 106, 1)'
      ],
      hoverBackgroundColor: [
        'rgba(42, 157, 143, 1)',
        'rgba(231, 111, 81, 1)',
        'rgba(233, 196, 106, 1)'
      ]
    }]
  };

  public pieChartType: ChartType = 'doughnut';

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: [],
    datasets: [{
      label: 'Anuladas',
      data: [],
      backgroundColor: [
        'rgba(231, 111, 81, 0.7)',

      ],
      borderColor: [
        'rgba(231, 111, 81, 1)',

      ],
      hoverBorderColor: [
        'rgba(231, 111, 81, 1)',

      ],
      hoverBackgroundColor: [
        'rgba(231, 111, 81, 1)',
      ]
    },
    {
      label: 'Marcadas',
      data: [],
      backgroundColor: [
        'rgba(42, 157, 143, 0.7)',

      ],
      borderColor: [
        'rgba(42, 157, 143, 1)',

      ],
      hoverBorderColor: [
        'rgba(42, 157, 143, 1)',

      ],
      hoverBackgroundColor: [
        'rgba(42, 157, 143, 1)',
      ]
    }]
  };




}
