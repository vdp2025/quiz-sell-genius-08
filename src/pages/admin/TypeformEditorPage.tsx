
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { TypeformQuizBuilder } from '@/components/quiz-builder/TypeformQuizBuilder';
import { useTypeformQuizBuilder } from '@/hooks/useTypeformQuizBuilder';
import { LoadingState } from '@/components/ui/loading-state';

const TypeformEditorPage = () => {
  const {
    components,
    stages,
    activeStageId,
    selectedComponentId,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    setSelectedComponentId,
    saveCurrentState,
    loading
  } = useTypeformQuizBuilder();

  if (loading) {
    return (
      <AdminLayout>
        <LoadingState message="Carregando editor de quiz..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)]">
        <TypeformQuizBuilder
          stages={stages}
          components={components}
          activeStageId={activeStageId}
          selectedComponentId={selectedComponentId}
          onAddStage={addStage}
          onUpdateStage={updateStage}
          onDeleteStage={deleteStage}
          onMoveStage={moveStage}
          onSetActiveStage={setActiveStage}
          onAddComponent={addComponent}
          onUpdateComponent={updateComponent}
          onDeleteComponent={deleteComponent}
          onMoveComponent={moveComponent}
          onSelectComponent={setSelectedComponentId}
          onSave={saveCurrentState}
        />
      </div>
    </AdminLayout>
  );
};

export default TypeformEditorPage;
