import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePageEventsToolbar = () => (
    <div className="homepage__events__toolbar">
        <div className="homepage__events__toolbar__container">
            <NavLink to="/עיצוב_אירועים" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="design" src="/images/homepage/events/toolbar/events-toolbar-design.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">עיצוב אירועים</p>
            </NavLink>
            <NavLink to="/פסטיבלים" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="fest" src="/images/homepage/events/toolbar/events-toolbar-fest.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">פסטיבלים</p>
            </NavLink>
            <NavLink to="/ימי_גיבוש_וכיף" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="fun" src="/images/homepage/events/toolbar/events-toolbar-fun.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">ימי גיבוש וכיף</p>
            </NavLink>
            <NavLink to="/אירועי_vip" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="vip" src="/images/homepage/events/toolbar/events-toolbar-vip.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">אירועי vip</p>
            </NavLink>
            <NavLink to="/נופשונים" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="vacation" src="/images/homepage/events/toolbar/events-toolbar-vacation.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">נופשונים</p>
            </NavLink>
            <NavLink to="/כנסים" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="conference" src="/images/homepage/events/toolbar/events-toolbar-conference.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">כנסים</p>
            </NavLink>
            <NavLink to="/אירועי_שיווק_וקד״מ" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="sales" src="/images/homepage/events/toolbar/events-toolbar-sales.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">שיווק וקד״מ</p>
            </NavLink>
            <NavLink to="/אירועי_חברה" className="homepage__events__toolbar__item">
                <div className="homepage__events__toolbar__icon__box">
                    <img className="company" src="/images/homepage/events/toolbar/events-toolbar-company.svg" />
                </div>
                <p className="homepage__events__toolbar__text Heebo-Regular" dir="rtl">אירועי חברה</p>
            </NavLink>
        </div>
    </div>
);

export default HomePageEventsToolbar;