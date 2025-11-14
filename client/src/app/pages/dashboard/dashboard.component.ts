import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('taskChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  stats = { total: 0, completed: 0, pending: 0 };
  isLoading = true;
  private chartInstance: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadStats();
  }

  ngAfterViewInit() {}

  loadStats() {
    this.dashboardService.getStats().subscribe({
      next: (data: any) => {
        this.stats = {
          total: data.total || 0,
          completed: data.completed || 0,
          pending: data.pending || 0
        };
        this.isLoading = false;

        // Wait for view to update before creating chart
        setTimeout(() => this.buildOrUpdateChart(), 100);
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
        this.isLoading = false;
      }
    });
  }

  buildOrUpdateChart() {
    if (!this.chartRef) {
      console.error('Canvas not found!');
      return;
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found!');
      return;
    }

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          data: [this.stats.completed, this.stats.pending],
          backgroundColor: ['#00c9a7', '#ffb547']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
