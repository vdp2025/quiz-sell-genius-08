
import React, { useState } from 'react';
import { Download, RefreshCcw, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface DashboardHeaderProps {
  timeRange: '7d' | '30d' | 'all';
  onTimeRangeChange: (value: '7d' | '30d' | 'all') => void;
  onRefresh: () => void;
  onExportData: () => void;
  onClearData: () => void;
  onEventSelectionChange?: (events: string[]) => void;
  selectedEvents?: string[];
}

const EVENT_TYPES = [
  { id: 'quiz_start', label: 'Início do Quiz' },
  { id: 'quiz_answer', label: 'Resposta de Pergunta' },
  { id: 'quiz_complete', label: 'Conclusão do Quiz' },
  { id: 'result_view', label: 'Visualização de Resultado' },
  { id: 'lead_generated', label: 'Geração de Lead' },
  { id: 'sale', label: 'Venda' },
  { id: 'button_click', label: 'Clique em Botão' }
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  onTimeRangeChange,
  onRefresh,
  onExportData,
  onClearData,
  onEventSelectionChange,
  selectedEvents = ['quiz_start', 'quiz_complete', 'result_view', 'lead_generated', 'sale']
}) => {
  const [events, setEvents] = useState<string[]>(selectedEvents);
  
  const handleEventToggle = (eventId: string) => {
    const updatedEvents = events.includes(eventId)
      ? events.filter(id => id !== eventId)
      : [...events, eventId];
    
    setEvents(updatedEvents);
    if (onEventSelectionChange) {
      onEventSelectionChange(updatedEvents);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-[#432818]">Dashboard de Analytics</h1>
          <Breadcrumb className="text-sm text-muted-foreground mt-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/analytics">Analytics</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={(value) => onTimeRangeChange(value as any)}>
            <SelectTrigger className="w-[130px] h-8 border-border/60 bg-background">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="border-border/60 bg-background hover:bg-muted/80 h-8 w-8 relative">
                  <Filter className="h-4 w-4" />
                  {selectedEvents && selectedEvents.length > 0 && selectedEvents.length < EVENT_TYPES.length && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full transform translate-x-1/2 -translate-y-1/2" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Filtrar Eventos</h4>
                  <div className="space-y-1.5">
                    {EVENT_TYPES.map((event) => (
                      <div key={event.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`event-${event.id}`} 
                          checked={events.includes(event.id)}
                          onCheckedChange={() => handleEventToggle(event.id)}
                        />
                        <Label 
                          htmlFor={`event-${event.id}`}
                          className="text-sm leading-none cursor-pointer"
                        >
                          {event.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const allEvents = EVENT_TYPES.map(e => e.id);
                        setEvents(allEvents);
                        if (onEventSelectionChange) {
                          onEventSelectionChange(allEvents);
                        }
                      }}
                    >
                      Todos
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEvents([]);
                        if (onEventSelectionChange) {
                          onEventSelectionChange([]);
                        }
                      }}
                    >
                      Nenhum
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="icon" onClick={onRefresh} className="border-border/60 bg-background hover:bg-muted/80 h-8 w-8">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={onExportData} className="border-border/60 bg-background hover:bg-muted/80 h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={onClearData} className="border-border/60 bg-background hover:bg-muted/80 text-red-600 h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
