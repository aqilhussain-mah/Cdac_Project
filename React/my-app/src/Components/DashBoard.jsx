import React from 'react'

const DashBoard = () => {
    const cards = [
        { title: "Active Locations", value: 2, icon: "fas fa-map-marker-alt" },
        { title: "Active Services", value: 4, icon: "fas fa-concierge-bell" },
        { title: "Bookings", value: 2, icon: "fas fa-calendar-alt" },
        { title: "Unread Inquiries", value: 1, icon: "fas fa-envelope" },
      ];
  return (
    <div>
      {/* Dashboard */}
        <div className="dashboard">
          <h1>Welcome to Wedding Solutions - Admin Panel</h1>
          <div className="cards">
            {cards.map((card, index) => (
              <div key={index} className="card">
                <i className={card.icon}></i>
                <h3>{card.value}</h3>
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default DashBoard
