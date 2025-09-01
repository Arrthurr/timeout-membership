import { useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, Users, Filter, Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { FOUNDATION_EVENTS } from "~/lib/constants/foundation";

type EventStatus = "upcoming" | "past" | "recurring" | "cancelled" | "all";
type EventCategory = "fundraiser" | "volunteer" | "education" | "youth" | "social" | "all";
type ViewMode = "grid" | "list" | "compact";

interface EventsListProps {
  // Display options
  viewMode?: ViewMode;
  showFilters?: boolean;
  showSearch?: boolean;
  showActions?: boolean;
  maxEvents?: number;
  
  // Content options
  title?: string;
  subtitle?: string;
  showImages?: boolean;
  showPricing?: boolean;
  showStatus?: boolean;
  showCategory?: boolean;
  
  // Functionality
  editable?: boolean;
  onEventClick?: (eventId: string) => void;
  onEditEvent?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onAddEvent?: () => void;
  
  // Initial filters
  defaultStatus?: EventStatus;
  defaultCategory?: EventCategory;
  
  // Styling
  className?: string;
  cardClassName?: string;
}

export function EventsList({
  viewMode = "grid",
  showFilters = true,
  showSearch = true,
  showActions = false,
  maxEvents = 0,
  title = "Community Events",
  subtitle = "Join us for meaningful events that bring our community together.",
  showImages = true,
  showPricing = true,
  showStatus = true,
  showCategory = true,
  editable = false,
  onEventClick,
  onEditEvent,
  onDeleteEvent,
  onAddEvent,
  defaultStatus = "all",
  defaultCategory = "all",
  className = "",
  cardClassName = ""
}: EventsListProps) {
  const [statusFilter, setStatusFilter] = useState<EventStatus>(defaultStatus);
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search events
  const filteredEvents = FOUNDATION_EVENTS
    .filter((event) => {
      const statusMatch = statusFilter === "all" || event.status === statusFilter;
      const categoryMatch = categoryFilter === "all" || event.category === categoryFilter;
      const searchMatch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && categoryMatch && searchMatch;
    })
    .slice(0, maxEvents || FOUNDATION_EVENTS.length);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: viewMode === "compact" ? undefined : 'long',
      year: 'numeric', 
      month: viewMode === "compact" ? 'short' : 'long',
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
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
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

  const getActionButton = (event: any) => {
    if (event.status === "upcoming") {
      return (
        <button 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          onClick={() => onEventClick?.(event.id)}
        >
          Register Now
        </button>
      );
    } else if (event.status === "recurring") {
      return (
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          onClick={() => onEventClick?.(event.id)}
        >
          Join Next Session
        </button>
      );
    } else {
      return (
        <button 
          className="w-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
          disabled
        >
          Event Completed
        </button>
      );
    }
  };

  const renderGridView = () => (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className={`bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 ${cardClassName}`}
        >
          {/* Event Image */}
          {showImages && (
            <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                {showStatus && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(event.status)}`}>
                    {event.status}
                  </span>
                )}
                {showCategory && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm flex items-center gap-1">
                    {getCategoryIcon(event.category)}
                    {event.category}
                  </span>
                )}
              </div>
              {editable && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => onEditEvent?.(event.id)}
                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteEvent?.(event.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

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
              {showPricing && (
                <>
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
                </>
              )}
            </div>

            {/* Event Description */}
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Action Button */}
            {showActions && getActionButton(event)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className={`space-y-4 ${className}`}>
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className={`bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700 p-6 ${cardClassName}`}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Event Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                  {event.title}
                </h3>
                <div className="flex gap-2">
                  {showStatus && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(event.status)}`}>
                      {event.status}
                    </span>
                  )}
                  {editable && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditEvent?.(event.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteEvent?.(event.id)}
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-3">
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
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Action Area */}
            <div className="lg:w-48 flex flex-col justify-center">
              {showPricing && (
                <div className="mb-4 text-center">
                  {event.ticketPrice > 0 ? (
                    <div className="text-2xl font-bold text-amber-600">${event.ticketPrice}</div>
                  ) : (
                    <div className="text-lg font-semibold text-green-600">Free</div>
                  )}
                </div>
              )}
              {showActions && getActionButton(event)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompactView = () => (
    <div className={`space-y-3 ${className}`}>
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow duration-200 ${cardClassName}`}
        >
          <div className="flex gap-4">
            {/* Date Box */}
            <div className="flex-shrink-0 w-16 text-center">
              <div className="bg-amber-600 text-white rounded-lg p-2">
                <div className="text-xs font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div className="text-xl font-bold leading-none">
                  {new Date(event.date).getDate()}
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1 truncate">
                  {event.title}
                </h4>
                {editable && (
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => onEditEvent?.(event.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent?.(event.id)}
                      className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{event.location}</span>
                </div>
                {showPricing && (
                  <>
                    {event.ticketPrice > 0 && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${event.ticketPrice}</span>
                      </div>
                    )}
                    {event.ticketPrice === 0 && (
                      <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Action Button */}
            {showActions && (
              <div className="flex-shrink-0">
                <button 
                  onClick={() => onEventClick?.(event.id)}
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm px-3 py-1 rounded border border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  <Eye className="h-3 w-3 inline mr-1" />
                  View
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Controls */}
        {(showFilters || showSearch || editable) && (
          <div className="mb-8 space-y-4">
            {/* Search */}
            {showSearch && (
              <div className="flex justify-center">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Filters and Add Button */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              {showFilters && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status:</span>
                    {(["all", "upcoming", "past", "recurring"] as EventStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          statusFilter === status
                            ? "bg-amber-600 text-white shadow-md"
                            : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Category:</span>
                    {(["all", "fundraiser", "volunteer", "education", "youth", "social"] as EventCategory[]).map((category) => (
                      <button
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
              )}

              {editable && onAddEvent && (
                <button
                  onClick={onAddEvent}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Event
                </button>
              )}
            </div>
          </div>
        )}

        {/* Events Display */}
        {viewMode === "grid" && renderGridView()}
        {viewMode === "list" && renderListView()}
        {viewMode === "compact" && renderCompactView()}

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {searchQuery ? "No events match your search criteria." : "No events match your current filters."}
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
              Try adjusting your search or filter settings.
            </p>
          </div>
        )}

        {/* Results Summary */}
        {filteredEvents.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Showing {filteredEvents.length} of {FOUNDATION_EVENTS.length} events
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
