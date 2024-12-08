import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Schedule {
    id: number;
    title: string;
    day: string;
    startTime: number; // in minutes from midnight
    duration: number; // in minutes
    color: string;
}

@Component({
    selector: 'Schedule',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7 AM to 10 PM
    schedules: Schedule[] = [];
    groupedSchedules: { [key: string]: Schedule[] } = {};

    ngOnInit() {
        const colors = [
            'bg-red-400', 'bg-teal-400', 'bg-blue-400',
            'bg-yellow-400', 'bg-purple-400', 'bg-green-400'
        ];

        this.schedules = [
            { id: 1, title: 'Team Meeting', day: 'Monday', startTime: 540, duration: 120, color: 'bg-red-400' }, // 9:00 AM to 11:00 AM
        ];
        
        

        this.groupSchedules();
    }

    /* groupSchedules() {
        this.groupedSchedules = {};
        this.schedules.forEach(schedule => {
            const startHour = Math.floor(schedule.startTime / 60);
            const endHour = Math.ceil((schedule.startTime + schedule.duration) / 60);
    
            for (let hour = startHour; hour < endHour; hour++) {
                const key = `${schedule.day}-${hour}`;
                if (!this.groupedSchedules[key]) {
                    this.groupedSchedules[key] = [];
                }
                this.groupedSchedules[key].push(schedule);
            }
        });
    
        console.log('Grouped Schedules:', this.groupedSchedules); // Debug output
    } */
    
    groupSchedules() {
        this.groupedSchedules = {};
        this.schedules.forEach(schedule => {
            const startHour = Math.floor(schedule.startTime / 60);
            const key = `${schedule.day}-${startHour}`;
            if (!this.groupedSchedules[key]) {
                this.groupedSchedules[key] = [];
            }
            this.groupedSchedules[key].push(schedule);
        });
    }
    

    /* getScheduleStyle(schedule: Schedule, hour: number) {
        const startHour = Math.floor(schedule.startTime / 60);
        const startMinute = schedule.startTime % 60;
        const endTime = schedule.startTime + schedule.duration;
        const endHour = Math.floor(endTime / 60);
        const endMinute = endTime % 60;
    
        let topPercentage = 0;
        let heightPercentage = 0;
    
        if (hour === startHour) {
            // If this is the starting hour
            topPercentage = (startMinute / 60) * 100;
            heightPercentage = Math.min(
                100 - topPercentage, 
                (schedule.duration / 60) * 100
            );
        } else if (hour > startHour && hour < endHour) {
            // If this hour is fully covered by the schedule
            heightPercentage = 100;
        } else if (hour === endHour) {
            // If this is the ending hour
            heightPercentage = (endMinute / 60) * 100;
        }
    
        return {
            height: `${heightPercentage}%`,
            top: `${topPercentage}%`,
            position: 'absolute',
            width: '100%',
            zIndex: 10,
        };
    }
     */
    getScheduleStyle(schedule: Schedule, hour: number) {
        const startHour = Math.floor(schedule.startTime / 60);
        const startMinute = schedule.startTime % 60;
        const endTime = schedule.startTime + schedule.duration;
        const endHour = Math.floor(endTime / 60);
        const endMinute = endTime % 60;
    
        if (hour !== startHour) {
            return {}; // Prevent styles for non-starting hours
        }
    
        // Calculate total height from start to end time
        const totalDuration = (schedule.duration / 60) * 100;
        const topOffset = (startMinute / 60) * 100;
    
        return {
            height: `${totalDuration}%`,
            top: `${topOffset}%`,
            position: 'absolute',
            width: '100%',
            zIndex: 10,
        };
    }
    
    

    /* isScheduleVisible(schedule: Schedule, hour: number) {
        const startHour = Math.floor(schedule.startTime / 60);
        const endHour = Math.ceil((schedule.startTime + schedule.duration) / 60);
        return hour >= startHour && hour < endHour;
    } */
    isScheduleVisible(schedule: Schedule, hour: number) {
        const startHour = Math.floor(schedule.startTime / 60);
        return hour === startHour; // Only render the schedule in its starting hour
    }
    

    formatTime(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
    }
}
