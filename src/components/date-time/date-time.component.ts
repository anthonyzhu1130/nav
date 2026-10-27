import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  formatLunar,
  formatSolar,
  formatTime,
  getWeekNumber,
  getWeekday,
} from 'src/utils/date'

@Component({
  standalone: true,
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnInit, OnDestroy {
  private timer?: ReturnType<typeof setInterval>

  solar = ''
  lunar = ''
  week = 0
  weekday = ''
  time = ''

  ngOnInit(): void {
    this.update()
    this.timer = setInterval(() => this.update(), 1000)
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer)
  }

  private update(): void {
    const now = new Date()
    this.solar = formatSolar(now)
    this.lunar = formatLunar(now)
    this.week = getWeekNumber(now)
    this.weekday = getWeekday(now)
    this.time = formatTime(now)
  }
}
