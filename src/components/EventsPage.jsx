import { useState } from "react";
import {
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Navigation,
  Ticket,
  ChevronLeft,
  Plus,
  Minus,
  X,
  Check,
  Users,
  Tv
} from "lucide-react";
const NEARBY_EVENTS = [
  {
    id: "evt-1",
    title: "Aurora Fan Fest",
    type: "Convention",
    typeStyle: "bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]",
    date: "May 17, 2025",
    time: "10:00 AM - 8:00 PM",
    venue: "Expo Center Karachi",
    city: "Karachi",
    distance: "2.4 km",
    image: "/src/assets/images/starlight_expo_con_1790282403579.jpg",
    price: "$15.00",
    mapCoords: { x: 65, y: 32 }
  },
  {
    id: "evt-2",
    title: "Pixel Pals Meetup",
    type: "Cosplay Meetup",
    typeStyle: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
    date: "May 18, 2025",
    time: "2:00 PM - 6:00 PM",
    venue: "Riverside Park",
    city: "Karachi",
    distance: "5.7 km",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg",
    price: "Free",
    mapCoords: { x: 74, y: 42 }
  },
  {
    id: "evt-3",
    title: "Midnight Screenings: The Lost Realm",
    type: "Screening",
    typeStyle: "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]",
    date: "May 21, 2025",
    time: "7:00 PM - 11:00 PM",
    venue: "CineVista Arena",
    city: "Karachi",
    distance: "7.9 km",
    image: "/src/assets/images/cinema_screening_1790284828452.jpg",
    price: "$12.50",
    mapCoords: { x: 82, y: 38 }
  },
  {
    id: "evt-4",
    title: "Cosmos Con",
    type: "Convention",
    typeStyle: "bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]",
    date: "May 24, 2025",
    time: "10:00 AM - 7:00 PM",
    venue: "Harbor Convention Center",
    city: "Karachi",
    distance: "12.3 km",
    image: "/src/assets/images/neon_beat_festival_1790282824470.jpg",
    price: "$20.00",
    mapCoords: { x: 84, y: 47 }
  }
];
const DATE_EVENTS = {
  17: [
    {
      id: "d17-1",
      title: "Aurora Fan Fest",
      type: "Convention",
      typeStyle: "bg-[#F3E8FF] text-[#7E22CE]",
      date: "May 17, 2025",
      time: "10:00 AM - 8:00 PM",
      venue: "Expo Center Karachi",
      city: "Karachi",
      distance: "2.4 km",
      image: "/src/assets/images/starlight_expo_con_1790282403579.jpg",
      price: "$15.00",
      mapCoords: { x: 65, y: 32 }
    },
    {
      id: "d17-2",
      title: "Galaxy Games Expo",
      type: "Gaming",
      typeStyle: "bg-[#DCFCE7] text-[#15803D]",
      date: "May 17, 2025",
      time: "12:00 PM - 9:00 PM",
      venue: "Tech Hub Center",
      city: "Karachi",
      distance: "6.1 km",
      image: "/src/assets/images/orion_steel_1790281419734.jpg",
      price: "$10.00",
      mapCoords: { x: 74, y: 42 }
    },
    {
      id: "d17-3",
      title: "The Wandering Lights (Screening)",
      type: "Screening",
      typeStyle: "bg-[#DBEAFE] text-[#1E40AF]",
      date: "May 17, 2025",
      time: "4:00 PM - 10:00 PM",
      venue: "CineVista Arena",
      city: "Karachi",
      distance: "8.3 km",
      image: "/src/assets/images/cinema_screening_1790284828452.jpg",
      price: "$12.00",
      mapCoords: { x: 82, y: 38 }
    },
    {
      id: "d17-4",
      title: "Vivid Voices Live",
      type: "K-Pop",
      typeStyle: "bg-[#F3E8FF] text-[#7E22CE]",
      date: "May 17, 2025",
      time: "7:00 PM - 11:00 PM",
      venue: "Skyline Theater",
      city: "Karachi",
      distance: "11.6 km",
      image: "/src/assets/images/neon_beat_festival_1790282824470.jpg",
      price: "$25.00",
      mapCoords: { x: 84, y: 47 }
    }
  ]
};
const EventsPage = ({
  onNavigateHome,
  onNavigateSubmit
}) => {
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [selectedType, setSelectedType] = useState("Convention");
  const [selectedDay, setSelectedDay] = useState(17);
  const [activePopupEvent, setActivePopupEvent] = useState(NEARBY_EVENTS[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [ticketModalEvent, setTicketModalEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const handleUseLocation = () => {
    setToastMessage("Location updated to Karachi, Pakistan (GPS accuracy: 12m)");
    setTimeout(() => setToastMessage(null), 3e3);
  };
  const handleGetTickets = (event) => {
    setTicketModalEvent(event);
    setTicketQuantity(1);
    setTicketSuccess(false);
  };
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 font-sans select-none text-[#171717]">
      <div className="max-w-7xl mx-auto space-y-6">
        {
    /* 1. BREADCRUMBS: Home > Events */
  }
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#737373] font-medium">
          <button
    type="button"
    onClick={onNavigateHome}
    className="hover:text-black transition-colors cursor-pointer"
  >
            Home
          </button>
          <ChevronRight size={13} className="text-[#A3A3A3] shrink-0" />
          <span className="text-[#171717] font-semibold">Events</span>
        </nav>

        {
    /* 2. TITLE SECTION (Calendar Icon + Bold Heading + Subtitle) */
  }
        <div className="pt-0.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[32px] font-black text-[#1C1917] tracking-tight uppercase font-titan leading-none">
              EVENTS
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] text-[#737373] font-medium mt-1">
            Discover fan conventions, cosplay meetups, and screening events near you.
          </p>
        </div>

        {
    /* 3. FILTER BAR (City Select, Event Type Pills, Use my location) */
  }
        <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-3 sm:p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {
    /* City Selector */
  }
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#525252] shrink-0" />
              <div>
                <span className="block text-[10px] font-bold text-[#737373] leading-none">City</span>
                <div className="relative mt-0.5">
                  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    className="text-xs font-bold text-[#171717] bg-transparent pr-4 outline-hidden cursor-pointer"
  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Seoul">Seoul</option>
                    <option value="London">London</option>
                  </select>
                  <ChevronRight size={12} className="rotate-90 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]" />
                </div>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-stone-200 hidden sm:block" />

            {
    /* Event Type Pills */
  }
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#171717] mr-1">Event Type</span>
              
              {
    /* Convention Pill */
  }
              <button
    type="button"
    onClick={() => setSelectedType("Convention")}
    className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${selectedType === "Convention" ? "bg-[#FEF3C7] text-black border border-[#F59E0B] shadow-2xs" : "bg-white text-[#525252] border border-[#E5E7EB] hover:bg-stone-50"}`}
  >
                Convention
              </button>

              {
    /* Cosplay Meetup Pill */
  }
              <button
    type="button"
    onClick={() => setSelectedType("Cosplay Meetup")}
    className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${selectedType === "Cosplay Meetup" ? "bg-[#FEF3C7] text-black border border-[#F59E0B] shadow-2xs" : "bg-white text-[#525252] border border-[#E5E7EB] hover:bg-stone-50"}`}
  >
                Cosplay Meetup
              </button>

              {
    /* Screening Pill */
  }
              <button
    type="button"
    onClick={() => setSelectedType("Screening")}
    className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${selectedType === "Screening" ? "bg-[#FEF3C7] text-black border border-[#F59E0B] shadow-2xs" : "bg-white text-[#525252] border border-[#E5E7EB] hover:bg-stone-50"}`}
  >
                Screening
              </button>
            </div>
          </div>

          {
    /* Use my location button */
  }
          <button
    type="button"
    onClick={handleUseLocation}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#171717] border border-[#E5E7EB] hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs ml-auto"
  >
            <Navigation size={13} className="text-[#525252]" />
            <span>Use my location</span>
          </button>
        </div>

        {
    /* 4. TOP TWO-COLUMN SECTION: NEARBY EVENTS & INTERACTIVE MAP */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-1">
          {
    /* LEFT 6 COLUMNS: NEARBY EVENTS LIST */
  }
          <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
                Nearby Events
              </h2>
            </div>

            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              {NEARBY_EVENTS.map((event) => <div
    key={event.id}
    onClick={() => setActivePopupEvent(event)}
    className={`bg-white rounded-[12px] border p-2.5 sm:p-3 flex gap-3 sm:gap-3.5 items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all cursor-pointer group ${activePopupEvent?.id === event.id ? "border-[#FFA800] ring-1 ring-[#FFA800]/30" : "border-[#E5E7EB] hover:border-stone-300"}`}
  >
                  {
    /* Thumbnail */
  }
                  <div className="w-[100px] sm:w-[110px] aspect-[4/3] rounded-[8px] overflow-hidden shrink-0 bg-stone-900 shadow-2xs">
                    <img
    src={event.image}
    alt={event.title}
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />
                  </div>

                  {
    /* Body Content */
  }
                  <div className="flex-1 min-w-0 py-0.5 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${event.typeStyle}`}>
                        {event.type}
                      </span>
                      <span className="text-[10px] font-semibold text-[#737373] flex items-center gap-0.5 shrink-0">
                        <Navigation size={9} className="rotate-45" />
                        {event.distance}
                      </span>
                    </div>

                    <h3 className="font-bold text-[12.5px] sm:text-[13px] text-[#171717] leading-snug truncate group-hover:text-[#E05315] transition-colors">
                      {event.title}
                    </h3>

                    <div className="text-[10.5px] text-[#737373] space-y-0.5 font-medium">
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={11} className="shrink-0 text-[#9CA3AF]" />
                        <span>{event.date} &nbsp;•&nbsp; {event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={11} className="shrink-0 text-[#9CA3AF]" />
                        <span className="truncate">{event.venue}, {event.city}</span>
                      </div>
                    </div>

                    <div className="pt-0.5 text-right">
                      <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleGetTickets(event);
    }}
    className="text-[11px] font-bold text-[#E05315] hover:text-[#C2410C] transition-colors cursor-pointer inline-flex items-center gap-1"
  >
                        <span>Get tickets</span>
                        <span className="text-xs">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>

          {
    /* RIGHT 6 COLUMNS: GOOGLE MAPS PLACEHOLDER WITH ACTIVE POPUP & REALISTIC KARACHI CARTOGRAPHY */
  }
          <div className="lg:col-span-6 bg-[#E8ECEF] rounded-[14px] border border-[#CBD5E1] overflow-hidden shadow-xs relative min-h-[380px] flex flex-col justify-between select-none">
            {
    /* Real Google Maps Image Asset Base Layer (No CSS drawings) */
  }
            <div
    className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-300"
    style={{ transform: `scale(${zoomLevel})` }}
  >
              <img
    src="/src/assets/images/google_maps_karachi_1790285156619.jpg"
    alt="Google Map of Karachi"
    className="w-full h-full object-cover brightness-[1.02] contrast-[1.02]"
  />
            </div>

            {
    /* Google Maps Map / Satellite Toggle in Top-Left Corner */
  }
            <div className="absolute top-3 left-3 z-20 flex bg-white rounded-md shadow-md border border-stone-200 overflow-hidden text-[11px] font-semibold">
              <button
    type="button"
    className="px-2.5 py-1 bg-white text-[#1A73E8] font-bold border-r border-stone-100 hover:bg-stone-50 cursor-pointer"
  >
                Map
              </button>
              <button
    type="button"
    className="px-2.5 py-1 bg-white text-[#5F6368] hover:bg-stone-50 cursor-pointer"
  >
                Satellite
              </button>
            </div>

            {
    /* Interactive Location Markers Overlay */
  }
            <div className="absolute inset-0 pointer-events-none">
              {
    /* Event 1 Pin: Aurora Fan Fest (Convention - Purple) */
  }
              <div
    style={{ left: "65%", top: "32%" }}
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
    onClick={() => setActivePopupEvent(NEARBY_EVENTS[0])}
  >
                <div className="w-6 h-6 rounded-full bg-[#9333EA] text-white flex items-center justify-center shadow-md border-2 border-white ring-2 ring-[#9333EA]/30 group-hover:scale-110 transition-transform">
                  <Ticket size={11} className="stroke-[2.5]" />
                </div>
              </div>

              {
    /* Green Meetup Pin 1 */
  }
              <div
    style={{ left: "87%", top: "28%" }}
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
    onClick={() => setActivePopupEvent(NEARBY_EVENTS[1])}
  >
                <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                  <Users size={10} className="stroke-[2.5]" />
                </div>
              </div>

              {
    /* Event 2 Pin: Pixel Pals Meetup (Green) */
  }
              <div
    style={{ left: "74%", top: "42%" }}
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
    onClick={() => setActivePopupEvent(NEARBY_EVENTS[1])}
  >
                <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                  <Users size={10} className="stroke-[2.5]" />
                </div>
              </div>

              {
    /* Event 3 Pin: Midnight Screenings (Blue) */
  }
              <div
    style={{ left: "82%", top: "38%" }}
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
    onClick={() => setActivePopupEvent(NEARBY_EVENTS[2])}
  >
                <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                  <Tv size={10} className="stroke-[2.5]" />
                </div>
              </div>

              {
    /* Event 4 Pin: Cosmos Con (Purple) */
  }
              <div
    style={{ left: "84%", top: "47%" }}
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
    onClick={() => setActivePopupEvent(NEARBY_EVENTS[3])}
  >
                <div className="w-5 h-5 rounded-full bg-[#9333EA] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                  <Ticket size={10} className="stroke-[2.5]" />
                </div>
              </div>

              {
    /* Additional scattered pins matching reference screenshot */
  }
              <div style={{ left: "62%", top: "41%" }} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="w-5 h-5 rounded-full bg-[#9333EA] text-white flex items-center justify-center shadow border-2 border-white">
                  <Ticket size={9} />
                </div>
              </div>

              <div style={{ left: "89%", top: "35%" }} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="w-5 h-5 rounded-full bg-[#9333EA] text-white flex items-center justify-center shadow border-2 border-white">
                  <Ticket size={9} />
                </div>
              </div>
            </div>

            {
    /* Active Popup Info Window over the map (Aurora Fan Fest popup) */
  }
            {activePopupEvent && <div
    style={{ left: "57%", top: "22%" }}
    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-150"
  >
                <div className="bg-white rounded-[12px] p-2.5 shadow-xl border border-stone-200 flex gap-2.5 items-center max-w-[210px] relative">
                  <button
    type="button"
    onClick={() => setActivePopupEvent(null)}
    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-stone-300 shadow-xs flex items-center justify-center text-stone-500 hover:text-black cursor-pointer"
  >
                    <X size={11} className="stroke-[2.5]" />
                  </button>

                  <div className="w-12 h-12 rounded-[6px] overflow-hidden shrink-0 bg-black">
                    <img
    src={activePopupEvent.image}
    alt={activePopupEvent.title}
    className="w-full h-full object-cover"
  />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <h4 className="font-bold text-[11px] text-[#171717] truncate leading-tight">
                      {activePopupEvent.title}
                    </h4>
                    <div>
                      <span className="text-[7.5px] font-black px-1.5 py-0.2 rounded-full uppercase bg-[#F3E8FF] text-[#7E22CE]">
                        {activePopupEvent.type}
                      </span>
                    </div>
                    <div className="text-[8.5px] text-[#737373] flex items-center gap-0.5">
                      <CalendarIcon size={8} />
                      <span>{activePopupEvent.date} • {activePopupEvent.time.split(" - ")[0]}</span>
                    </div>
                    <div className="text-[8.5px] text-[#737373] flex items-center gap-0.5 truncate">
                      <MapPin size={8} />
                      <span className="truncate">{activePopupEvent.city}</span>
                    </div>
                  </div>
                </div>
              </div>}

            {
    /* Bottom-Left Google Brand Logo Watermark */
  }
            <div className="absolute bottom-2.5 left-3 z-20 pointer-events-none select-none">
              <span className="font-bold text-xs tracking-tight text-[#4285F4] drop-shadow-xs">G<span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
            </div>

            {
    /* Map Controls Bottom Right */
  }
            <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5 items-center">
              <button
    type="button"
    onClick={handleUseLocation}
    className="w-7 h-7 rounded-lg bg-white border border-stone-200 shadow-sm flex items-center justify-center text-[#525252] hover:text-black cursor-pointer transition-colors"
    title="Reset orientation"
  >
                <Navigation size={12} className="rotate-45" />
              </button>

              <div className="flex flex-col bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
                <button
    type="button"
    onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
    className="w-7 h-7 flex items-center justify-center text-[#525252] hover:text-black hover:bg-stone-50 cursor-pointer border-b border-stone-100"
    title="Zoom In"
  >
                  <Plus size={13} className="stroke-[2.5]" />
                </button>
                <button
    type="button"
    onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
    className="w-7 h-7 flex items-center justify-center text-[#525252] hover:text-black hover:bg-stone-50 cursor-pointer"
    title="Zoom Out"
  >
                  <Minus size={13} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {
    /* 5. BOTTOM TWO-COLUMN SECTION: EVENT CALENDAR & EVENTS ON SELECTED DATE */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-2">
          {
    /* LEFT 6 COLUMNS: EVENT CALENDAR */
  }
          <div className="lg:col-span-6 bg-white rounded-[14px] border border-[#E5E7EB] p-4 sm:p-5 shadow-2xs space-y-4">
            {
    /* Header: Event Calendar and Month Switcher */
  }
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
                  Event Calendar
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
    type="button"
    className="p-1 rounded hover:bg-stone-100 text-[#737373] hover:text-black cursor-pointer"
  >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold text-[#171717]">May 2025</span>
                <button
    type="button"
    className="p-1 rounded hover:bg-stone-100 text-[#737373] hover:text-black cursor-pointer"
  >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {
    /* Calendar Days Table */
  }
            <div>
              {
    /* Day Headers */
  }
              <div className="grid grid-cols-7 text-center text-[10.5px] font-semibold text-[#737373] pb-2 border-b border-[#F3F4F6]">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {
    /* Calendar Grid */
  }
              <div className="grid grid-cols-7 gap-y-2 pt-2 text-center text-xs">
                {
    /* Previous month days: 27, 28, 29, 30 */
  }
                <div className="py-1 text-[#D1D5DB]">27</div>
                <div className="py-1 text-[#D1D5DB]">28</div>
                <div className="py-1 text-[#D1D5DB]">29</div>
                <div className="py-1 text-[#D1D5DB]">30</div>

                {
    /* Day 1, 2 */
  }
                <div className="py-1 font-medium text-[#171717]">1</div>
                <div className="py-1 font-medium text-[#171717]">2</div>

                {
    /* Day 3 (has 2 dots) */
  }
                <div
    onClick={() => setSelectedDay(3)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>3</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                    <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                  </div>
                </div>

                {
    /* Day 4, 5, 6, 7, 8, 9, 10 */
  }
                <div className="py-1 font-medium text-[#171717]">4</div>
                <div className="py-1 font-medium text-[#171717]">5</div>
                <div className="py-1 font-medium text-[#171717]">6</div>
                <div className="py-1 font-medium text-[#171717]">7</div>
                <div className="py-1 font-medium text-[#171717]">8</div>
                <div className="py-1 font-medium text-[#171717]">9</div>
                <div
    onClick={() => setSelectedDay(10)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>10</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0D9488]" />
                  </div>
                </div>

                {
    /* Day 11 to 17 */
  }
                <div
    onClick={() => setSelectedDay(11)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>11</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(12)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>12</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(13)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>13</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(14)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>14</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(15)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>15</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(16)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>16</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                  </div>
                </div>

                {
    /* Day 17 (SELECTED DATE WITH ORANGE CIRCLE) */
  }
                <div
    onClick={() => setSelectedDay(17)}
    className="py-0.5 flex flex-col items-center justify-center cursor-pointer"
  >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-transform ${selectedDay === 17 ? "bg-[#FFA800] text-black scale-105" : "hover:bg-stone-100 text-[#171717]"}`}>
                    17
                  </div>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                  </div>
                </div>

                {
    /* Day 18 to 24 */
  }
                <div
    onClick={() => setSelectedDay(18)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>18</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(19)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>19</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(20)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>20</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div
    onClick={() => setSelectedDay(21)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>21</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                  </div>
                </div>

                <div className="py-1 font-medium text-[#171717]">22</div>
                <div className="py-1 font-medium text-[#171717]">23</div>

                <div
    onClick={() => setSelectedDay(24)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>24</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                  </div>
                </div>

                {
    /* Day 25 to 31 */
  }
                <div
    onClick={() => setSelectedDay(25)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>25</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                  </div>
                </div>

                <div className="py-1 font-medium text-[#171717]">26</div>

                <div
    onClick={() => setSelectedDay(27)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>27</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div className="py-1 font-medium text-[#171717]">28</div>
                <div className="py-1 font-medium text-[#171717]">29</div>
                <div className="py-1 font-medium text-[#171717]">30</div>

                <div
    onClick={() => setSelectedDay(31)}
    className="py-1 font-medium text-[#171717] cursor-pointer hover:bg-stone-50 rounded"
  >
                  <span>31</span>
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
    /* RIGHT 6 COLUMNS: EVENTS ON SELECTED DATE */
  }
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm sm:text-[14px] font-bold text-[#171717]">
              Events on May {selectedDay}, 2025
            </h3>

            <div className="space-y-2.5">
              {(DATE_EVENTS[selectedDay] || DATE_EVENTS[17]).map((event) => <div
    key={event.id}
    className="bg-white rounded-[12px] border border-[#E5E7EB] p-2.5 sm:p-3 flex gap-3 sm:gap-3.5 items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all group"
  >
                  {
    /* Thumbnail */
  }
                  <div className="w-[100px] sm:w-[110px] aspect-[4/3] rounded-[8px] overflow-hidden shrink-0 bg-stone-900 shadow-2xs">
                    <img
    src={event.image}
    alt={event.title}
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />
                  </div>

                  {
    /* Body Content */
  }
                  <div className="flex-1 min-w-0 py-0.5 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${event.typeStyle}`}>
                        {event.type}
                      </span>
                      <span className="text-[10px] font-semibold text-[#737373] flex items-center gap-0.5 shrink-0">
                        <Navigation size={9} className="rotate-45" />
                        {event.distance}
                      </span>
                    </div>

                    <h4 className="font-bold text-[12.5px] sm:text-[13px] text-[#171717] leading-snug truncate group-hover:text-[#E05315] transition-colors">
                      {event.title}
                    </h4>

                    <div className="text-[10.5px] text-[#737373] space-y-0.5 font-medium">
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={11} className="shrink-0 text-[#9CA3AF]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={11} className="shrink-0 text-[#9CA3AF]" />
                        <span className="truncate">{event.venue} &nbsp;•&nbsp; {event.city}</span>
                      </div>
                    </div>

                    <div className="pt-0.5 text-right">
                      <button
    type="button"
    onClick={() => handleGetTickets(event)}
    className="text-[11px] font-bold text-[#E05315] hover:text-[#C2410C] transition-colors cursor-pointer inline-flex items-center gap-1"
  >
                        <span>Get tickets</span>
                        <span className="text-xs">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        {
    /* 6. BOTTOM BANNER: SUBMIT YOUR FAN CONTENT (WITH PANORAMIC ARTWORK) */
  }
        <section className="pt-2 pb-6">
          <div className="relative rounded-[16px] overflow-hidden border border-[#E2E8F0] bg-gradient-to-r from-[#FAF8F5] via-[#EFF6FF] to-transparent shadow-xs flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 min-h-[96px]">
            {
    /* Background panoramic artwork */
  }
            <div className="absolute inset-y-0 right-0 w-2/3 sm:w-1/2 overflow-hidden pointer-events-none opacity-85">
              <img
    src="/src/assets/images/fan_content_banner_art_1790284032615.jpg"
    alt="Banner Illustration"
    className="w-full h-full object-cover object-right"
  />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#EFF6FF]/80 to-transparent" />
            </div>

            {
    /* Left Content */
  }
            <div className="relative z-10 flex items-center gap-3">
              <div>
                <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
                  Submit your fan content
                </h3>
                <p className="text-[11.5px] text-[#737373] font-medium">
                  Share your articles, artwork, and stories with the community.
                </p>
              </div>
            </div>

            {
    /* Right Action Button */
  }
            <div className="relative z-10 pt-3 sm:pt-0">
              <button
    type="button"
    onClick={onNavigateSubmit}
    className="bg-[#FFA800] hover:bg-[#FFB51A] text-black font-extrabold text-[12px] py-2 px-4 rounded-[8px] shadow-xs transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
  >
                <span>Submit content</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {
    /* TOAST NOTIFICATION */
  }
      {toastMessage && <div className="fixed bottom-6 right-6 z-50 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check size={14} className="text-[#FFA800]" />
          <span>{toastMessage}</span>
        </div>}

      {
    /* TICKET RESERVATION MODAL */
  }
      {ticketModalEvent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#181A20] border border-[#2B2F3D] text-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${ticketModalEvent.typeStyle}`}>
                {ticketModalEvent.type}
              </span>
              <button
    type="button"
    onClick={() => setTicketModalEvent(null)}
    className="text-stone-400 hover:text-white cursor-pointer"
  >
                <X size={18} />
              </button>
            </div>

            {ticketSuccess ? <div className="py-6 text-center space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check size={24} className="stroke-[3]" />
                </div>
                <h4 className="text-base font-bold">Tickets Confirmed!</h4>
                <p className="text-xs text-stone-300 max-w-xs mx-auto">
                  You reserved {ticketQuantity} pass(es) for <strong>{ticketModalEvent.title}</strong> at {ticketModalEvent.venue}.
                </p>
                <button
    type="button"
    onClick={() => setTicketModalEvent(null)}
    className="mt-3 px-5 py-2 bg-[#FFA800] text-black font-extrabold text-xs rounded-lg cursor-pointer"
  >
                  Done
                </button>
              </div> : <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-900">
                    <img
    src={ticketModalEvent.image}
    alt={ticketModalEvent.title}
    className="w-full h-full object-cover"
  />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{ticketModalEvent.title}</h3>
                    <p className="text-[11px] text-stone-400">{ticketModalEvent.date} &nbsp;•&nbsp; {ticketModalEvent.time}</p>
                    <p className="text-[11px] text-[#FFA800] font-semibold">{ticketModalEvent.venue}, {ticketModalEvent.city}</p>
                  </div>
                </div>

                <div className="bg-[#121418] p-3 rounded-xl border border-[#262A36] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300">Standard Pass</span>
                    <span className="font-bold text-[#FFA800]">{ticketModalEvent.price || "$15.00"}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#262A36]">
                    <span className="text-xs text-stone-400">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
    type="button"
    onClick={() => setTicketQuantity((q) => Math.max(1, q - 1))}
    className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white"
  >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{ticketQuantity}</span>
                      <button
    type="button"
    onClick={() => setTicketQuantity((q) => Math.min(8, q + 1))}
    className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white"
  >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
    type="button"
    onClick={() => setTicketModalEvent(null)}
    className="px-4 py-2 border border-stone-700 text-xs font-semibold rounded-lg text-stone-300 hover:text-white"
  >
                    Cancel
                  </button>
                  <button
    type="button"
    onClick={() => setTicketSuccess(true)}
    className="px-5 py-2 bg-[#FFA800] hover:bg-[#FFB51A] text-black font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
  >
                    Reserve Tickets
                  </button>
                </div>
              </div>}
          </div>
        </div>}
    </div>;
};
export {
  EventsPage
};
