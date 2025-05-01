
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, User, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UsersTabProps {
  prepareUsersList: () => any[];
  handleViewUserDetails: (userId: string) => void;
  userEvents: any[];
  selectedUser: string | null;
  formatDate: (date: Date | null) => string;
  getEventIcon: (eventType: string) => JSX.Element;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  prepareUsersList,
  handleViewUserDetails,
  userEvents,
  selectedUser,
  formatDate,
  getEventIcon,
  searchTerm,
  setSearchTerm
}) => {
  const users = prepareUsersList();
  const [selectedUserData, setSelectedUserData] = useState<any>(null);

  const handleUserSelect = (user: any) => {
    handleViewUserDetails(user.id);
    setSelectedUserData(user);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Usuários do Quiz</CardTitle>
              <CardDescription className="mt-1">
                Informações detalhadas sobre cada usuário que iniciou o quiz
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                className="w-[250px]"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Última atividade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Perguntas</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formatDate(user.startTime)}</TableCell>
                    <TableCell>{formatDate(user.lastActivity)}</TableCell>
                    <TableCell>
                      {user.completed ? (
                        <Badge className="bg-green-500 text-white">Concluído</Badge>
                      ) : (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">Em progresso</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{user.totalQuestions}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleUserSelect(user)}>
                            <User className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Usuário</DialogTitle>
                            <DialogDescription>
                              Histórico completo de atividades do usuário: {selectedUserData?.name}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Nome</p>
                              <p className="text-base">{selectedUserData?.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-base">{selectedUserData?.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Início</p>
                              <p className="text-base">{formatDate(selectedUserData?.startTime)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Conclusão</p>
                              <p className="text-base">{formatDate(selectedUserData?.completeTime)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Perguntas Respondidas</p>
                              <p className="text-base">{selectedUserData?.totalQuestions}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Status</p>
                              <p className="text-base">
                                {selectedUserData?.completed ? (
                                  <Badge className="bg-green-500 text-white">Concluído</Badge>
                                ) : (
                                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">Em progresso</Badge>
                                )}
                              </p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Histórico de Eventos</h4>
                            <ScrollArea className="h-[300px]">
                              <div className="space-y-4">
                                {userEvents.map((event, index) => (
                                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                                    <div className="flex-shrink-0 pt-1">
                                      {getEventIcon(event.type)}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">
                                        {event.type === 'quiz_answer' ? (
                                          <>Respondeu à questão {event.questionIndex + 1}</>
                                        ) : event.type === 'quiz_start' ? (
                                          <>Iniciou o quiz</>
                                        ) : event.type === 'quiz_complete' ? (
                                          <>Completou o quiz</>
                                        ) : event.type === 'result_view' ? (
                                          <>Visualizou o resultado: {event.resultType}</>
                                        ) : event.type === 'lead_generated' ? (
                                          <>Lead gerado: {event.email}</>
                                        ) : event.type === 'sale' ? (
                                          <>Realizou uma compra no valor de R$ {event.value}</>
                                        ) : (
                                          <>Evento: {event.type}</>
                                        )}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(event.timestamp).toLocaleString()}
                                      </p>
                                      {event.type === 'quiz_answer' && (
                                        <div className="mt-1 text-xs text-gray-600">
                                          <p>Opções selecionadas: {event.selectedOptions?.join(', ') || 'N/A'}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {userEvents.length === 0 && (
                                  <p className="text-sm text-gray-500">Nenhum evento encontrado para este usuário.</p>
                                )}
                              </div>
                            </ScrollArea>
                          </div>
                          
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                // Export functionality kept the same as original
                                console.log('Exporting data for user:', selectedUserData?.name);
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Exportar Dados do Usuário
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      {searchTerm ? 'Nenhum usuário encontrado para esta busca.' : 'Nenhum usuário encontrado.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
