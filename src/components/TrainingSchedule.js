//https://github.com/jquense/react-big-calendar/blob/master/stories/demos/exampleCode/basic.js
import React, {useState, useEffect, useMemo} from 'react'
import { PropTypes } from '@mui/material'
import dayjs from 'dayjs'
import { Calendar, Views, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'

const localizer = globalizeLocalizer(globalize)

export default function TrainingSchedule(){  
    const [trainings, setTrainings] = React.useState([]);
    const dates = [];
    const events = [
        {
          title: 'My Event',
          start: new Date('2022-12-12T13:45:00-05:00'),
          end: new Date('2022-12-12T14:00:00-05:00')
        }
      ]
    
    const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })

    const { components, defaultDate, max, views } = useMemo(
        () => ({
          components: {
            timeSlotWrapper: ColoredDateCellWrapper,
          },
          defaultDate: new Date(2022, 12, 12),
          //max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
          views: Object.keys(Views).map((k) => Views[k]),
        }),
        []
      )


    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            if(response.ok)
                return response.json();
            else
            alert('Error when getting trainings ' + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error)
    }, [] );



    return(
        <div className='height600'>
        <Calendar
        localizer={localizer}
        components={components}
        defaultDate={defaultDate}
        events={events}
        max={max}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        //showMultiDayTimes
        step={60}
        views={views}
        />
    </div>
    );
}