export interface Event {
    id: string;
    title: string;
    category: string;
    date: string;
    time: string;
    venue: string;
    description: string;
    joined: boolean;
  }
  
  export const eventsData: Event[] = [
    { id: '1', title: 'Campus Tech Summit', category: 'Academic', date: 'September 20, 2026', time: '9:00 AM – 3:00 PM', venue: 'University Auditorium', description: 'A campus technology and innovation event.', joined: false },
    { id: '2', title: 'Intramural Basketball Finals', category: 'Sports', date: 'September 23, 2026', time: '4:00 PM – 6:00 PM', venue: 'Campus Gymnasium', description: 'Support the campus finalists.', joined: false },
    { id: '3', title: 'Heritage Night', category: 'Cultural', date: 'September 25, 2026', time: '5:30 PM – 8:30 PM', venue: 'Student Plaza', description: 'Celebrate campus cultures through music and food.', joined: false },
    { id: '4', title: 'Resume Design Lab', category: 'Workshop', date: 'September 28, 2026', time: '1:00 PM – 3:00 PM', venue: 'Learning Commons 2F', description: 'Improve your resume with career mentors.', joined: false },
    { id: '5', title: 'Freshers Picnic', category: 'Social', date: 'October 2, 2026', time: '11:00 AM – 2:00 PM', venue: 'North Lawn', description: 'Make friends through campus games and lunch.', joined: false },
  ];
