import { createTaskPage, projectsComponent, editTaskPage, tasksPage, homePage, tasksDBPage } from "../pages/Index";

class TaskActions {
    async createTask(
        projectIndex: number,
        summary: string,
        description: string,
        status: "IN PROGRESS" | "TO DO" | "IN REVIEW" | "DONE",
        labels: string[],
        filePaths: string[],
    ): Promise<void> {
        await projectsComponent.clickAddTaskButton(projectIndex);
        await createTaskPage.setSummary(summary);
        await createTaskPage.setDescription(description);
        await createTaskPage.setStatus(status);
        for (let i = 0; i < labels.length; i++) {
            await createTaskPage.setLabel(labels[i]);
        }
        for (let i = 0; i < labels.length; i++) {
            await createTaskPage.uploadFile(filePaths[i]);
        }
        await createTaskPage.submit();
    }

    async editTask(
        projectIndex: string,
        summary: string,
        description: string,
        status: "IN PROGRESS" | "TO DO" | "IN REVIEW" | "DONE",
        labels: string[],
        filePaths: string[],
    ): Promise<void> {
        await tasksPage.clickEditButton(projectIndex);
        await editTaskPage.setSummary(summary);
        await editTaskPage.setDescription(description);
        await editTaskPage.setStatus(status);
        for (let i = 0; i < labels.length; i++) {
            await editTaskPage.setLabel(labels[i]);
        }

        await editTaskPage.submit();
    }

    async deleteTask(taskId: string) {
        await tasksPage.clickDeleteButton(taskId);
    }

    async sortTasks() {
        await tasksDBPage.clickSortTasksButton();
    }

    async searchTaskDB(searchValue: string) {
        await tasksDBPage.search(searchValue);
    }
}

const taskActions = new TaskActions();
export { taskActions };
