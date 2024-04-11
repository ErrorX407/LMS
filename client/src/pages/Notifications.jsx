import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { FilterPaginationData } from "../common/FilterPaginationData";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import NoDataMessage from "../components/NoDataMessage";
import NotificationCard from "../components/NotificationCard";
import LoadMoreButton from "../components/LoadMoreButton";

const Notifications = () => {
    let {userAuth, userAuth: {access_token, new_notification_available}, setUserAuth} = useContext(UserContext)
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(null);

  const filters = ["all", "like", "comment", "reply"];

  const fetchNotifications = ({page, deletedDocCount = 0}) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/notification", {
        page,
        deletedDocCount,
        filter
    }, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(async ({data: {notifications: data}}) => {
      if (new_notification_available) {
        setUserAuth({ ...userAuth, new_notification_available: false});
      }

        let formatedData = await FilterPaginationData({
            state: notifications,
            data,
            page,
            countRoute: "/api/v1/notification/count",
            data_to_send: {filter},
            user: access_token
        })

        setNotifications(formatedData);
    })
    .catch((err) => {
        console.log(err);
    });
  }

  useEffect(()=>{
    if (access_token) {
        fetchNotifications({ page: 1 })
    }
  }, [access_token, filter])

  const handleFilter = (e) => {
    setFilter(e.target.value);

    setNotifications(null)
  };
  return (
    <div>
      <h1 className="font-candela text-3xl mb-0 max-md:hidden">
        Recent Notifications{" "}
      </h1>

      <div className="my-8 flex gap-3">
        {
            filters.map((filterName, i) => {
              return (
                <button
                value={filterName}
                  key={i}
                  onClick={handleFilter}
                  className={"capitalize px-4 py-2 rounded-2xl duration-300"  + (filter == filterName ? " bg-purple text-black hover:bg-purple/80" : " bg-white/10 hover:bg-white/20 ")}
                >
                  {filterName}
                </button>
              );
            })
  
        }
      </div>

      {
        notifications == null ? <Loader /> :
        <>
          {
            notifications.results.length ? 
            notifications.results.map((notification, i) => {
              // console.log(notifications.results.length);
              return (
                <div className="post-container my-3 w-full flex gap-5 flex-wrap rounded-2xl" key={i}>
                  <NotificationCard data={notification} index={i} notificationState={{notifications, setNotifications}} />
                </div>
              );
            })
            : <NoDataMessage message="🔕 No notifications available. Enjoy the calm! 😊🌟" />
          }
          <LoadMoreButton state={notifications} fetchDataFun={fetchNotifications} additionalParam={{ deletedDocCount: notifications.deletedDocCount }} />
        </>
      }
      
    </div>
  );
};

export default Notifications;
