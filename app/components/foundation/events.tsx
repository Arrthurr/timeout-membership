import { useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, Users } from "lucide-react";
import { FOUNDATION_EVENTS } from "~/lib/constants/foundation";

type EventStatus = "upcoming" | "past" | "recurring" | "all";
type EventCategory = "fundraiser" | "volunteer" | "education" | "youth" | "social" | "all";

export function CommunityEvents() {
  const [statusFilter, setStatusFilter] = useState<EventStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>("all");

  const filteredEvents = FOUNDATION_EVENTS.filter((event) => {
    const statusMatch = statusFilter === "all" || event.status === statusFilter;
    const categoryMatch = categoryFilter === "all" || event.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "past":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "recurring":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fundraiser":
        return <DollarSign className="h-4 w-4" />;
      case "volunteer":
        return <Users className="h-4 w-4" />;
      case "education":
        return <Users className="h-4 w-4" />;
      case "youth":
        return <Users className="h-4 w-4" />;
      case "social":
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Community Events
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Join us for meaningful events that bring our community together, 
            support important causes, and create lasting connections.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 self-center mr-2">Status:</span>
            {(["all", "upcoming", "past", "recurring"] as EventStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  statusFilter === status
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 self-center mr-2">Category:</span>
            {(["all", "fundraiser", "volunteer", "education", "youth", "social"] as EventCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  categoryFilter === category
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              {/* Event Image */}
              <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm flex items-center gap-1">
                    {getCategoryIcon(event.category)}
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  {event.ticketPrice > 0 && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <DollarSign className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">${event.ticketPrice}</span>
                    </div>
                  )}
                  {event.ticketPrice === 0 && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <span className="text-sm font-medium">Free Event</span>
                    </div>
                  )}
                </div>

                {/* Event Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Action Button */}
                <button 
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    event.status === "upcoming"
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : event.status === "recurring"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-not-allowed"
                  }`}
                  disabled={event.status === "past"}
                >
                  {event.status === "upcoming" ? "Register Now" : 
                   event.status === "recurring" ? "Join Next Session" : 
                   "Event Completed"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No events match your current filters. Try adjusting your selection above.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-xl border border-amber-200 dark:border-amber-700">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Stay Connected
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Don't miss out on upcoming events! Subscribe to our newsletter to receive 
            event updates and community announcements directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              Subscribe Newsletter
            </button>
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View Event Calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
