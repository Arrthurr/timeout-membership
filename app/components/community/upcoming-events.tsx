import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import { FOUNDATION_EVENTS } from "~/lib/constants/foundation";

interface UpcomingEventsProps {
  maxEvents?: number;
  showFilters?: boolean;
  compact?: boolean;
}

export function UpcomingEvents({
  maxEvents = 6,
  showFilters = false,
  compact = false,
}: UpcomingEventsProps) {
  // Filter to only upcoming events and sort by date
  const upcomingEvents = FOUNDATION_EVENTS.filter(
    (event) => event.status === "upcoming"
  )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, maxEvents);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (compact) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCompactDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
    };
  };

  if (upcomingEvents.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600 dark:text-slate-400">
          No upcoming events at this time. Check back soon!
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => {
            const dateInfo = formatCompactDate(event.date);
            return (
              <div
                key={event.id}
                className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200"
              >
                {/* Date Box */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-amber-600 text-white rounded-lg p-2">
                    <div className="text-xs font-medium">{dateInfo.month}</div>
                    <div className="text-xl font-bold leading-none">
                      {dateInfo.day}
                    </div>
                  </div>
                </div>

                {/* Event Info */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1 truncate">
                    {event.title}
                  </h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    {(event.ticketPrice as number) > 0 && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${event.ticketPrice}</span>
                      </div>
                    )}
                    {(event.ticketPrice as number) === 0 && (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-2">
          <button className="w-full text-sm text-amber-600 hover:text-amber-700 font-medium">
            View All Events →
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join us for these upcoming community events and activities.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 group"
            >
              {/* Event Image/Header */}
              <div className="h-40 bg-gradient-to-br from-amber-400 to-orange-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Upcoming
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-white">
                    <div className="text-2xl font-bold">
                      {formatCompactDate(event.date).day}
                    </div>
                    <div className="text-sm opacity-90">
                      {formatCompactDate(event.date).month}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
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
                  {(event.ticketPrice as number) > 0 && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <DollarSign className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">${event.ticketPrice}</span>
                    </div>
                  )}
                  {(event.ticketPrice as number) === 0 && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <span className="text-sm font-medium">Free Event</span>
                    </div>
                  )}
                </div>

                {/* Event Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Action Button */}
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            View All Community Events
          </button>
        </div>
      </div>
    </section>
  );
}
