'use client'

import "./schedule.css";

export default function test(){
    return(
    <>
    <main className = "flex flex-col gap-3 h-screen">
        <div id = "navBar">
            NavBar component
        </div>
        <div className = "center">
            <div id  = "calendarLink">
                Calendar Link
            </div>
        </div>
        <div className="scheduleSection">
            <div id = "title">
                Schedule
            </div>
                <div className = "calendar">
                    <div id = "calDay1">
                        Calendar 1
                    </div>
                    <div id = "calDay2">
                        Calendar 2
                    </div>
                </div>
        </div>
        <div id = "footer">
            Footer
        </div>
    </main>
    </>
    )
}