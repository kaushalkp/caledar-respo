var Calendar = function () {


    return {
        //main function to initiate the module
        init: function () {
            Calendar.initCalendar();
        },

        initCalendar: function () {
            
            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if (Metronic.isRTL()) {
                 if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        right: 'title, prev, next',
                        center: '',
                        right: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }                
            } else {
                 if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }
            
            function get_aspectratio() {
            var get_calendar_height= $(window).height() - 30;
            var get_calendar_width= $(window).width() - 30;
//            console.log("height"+get_calendar_height);
//            console.log("width"+get_calendar_width);
//            console.log(get_calendar_width/get_calendar_height);
            return (get_calendar_width/get_calendar_height);
        }
           

            //            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                header: h,
                defaultView: 'month', // change default view with available options from http://arshaw.com/fullcalendar/docs/views/Available_Views/ 
                slotMinutes: 15,
                editable: true,
                
                
                 aspectRatio: get_aspectratio(),
                  windowResize: function(view) {
                     // console.log(view);
                      $('#calendar').fullCalendar('option', 'aspectRatio',get_aspectratio() );
                },
                                
                events: [{
                        title: 'title',                        
                        start: new Date(y, m, 1),
                        backgroundColor: Metronic.getBrandColor('yellow')
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                        backgroundColor: Metronic.getBrandColor('green')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false,
                        backgroundColor: Metronic.getBrandColor('red')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false,
                        backgroundColor: Metronic.getBrandColor('green')
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        backgroundColor: Metronic.getBrandColor('grey'),
                        allDay: false,
                    }, {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        backgroundColor: Metronic.getBrandColor('purple'),
                        allDay: false,
                    }, {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        backgroundColor: Metronic.getBrandColor('yellow'),
                        url: 'http://google.com/',
                    }
                ],
                
                 dayClick: function(date, allDay, jsEvent, view) {
                   if(allDay){
//                       console.log(date);
//                       console.log(view.name);
                       $(this).css('background-color', 'red');
                       $('#calendar').fullCalendar( 'gotoDate', date );
                       $('#calendar').fullCalendar( 'changeView', 'agendaDay' );
                        
                        return;
                        
                    } 
            },
             eventClick: function(calEvent, jsEvent, view) {
                 
                 if(view.name=='month')
                 {
//                     console.log(calEvent);
//                    console.log( jsEvent);
//                    console.log(view);
                    $('#calendar').fullCalendar( 'gotoDate', calEvent.start );
                       $('#calendar').fullCalendar( 'changeView', 'agendaDay' );
                 }
                 else{
                     alert("Event Title "+calEvent.title);
                 }

            

        // change the border color just for fun
        //$(this).css('border-color', 'red');

    }
            
            });

        }

    };

}();