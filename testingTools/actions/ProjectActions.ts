import { dashboardPage, createProjectPage, projectsComponent, editProjectPage } from "../pages/Index";

class ProjectActions {
    async createProject(name: string, description: string): Promise<void> {
        await dashboardPage.createNewProject();
        await createProjectPage.setName(name);
        await createProjectPage.setDescription(description);
        await createProjectPage.submit();
    }
    async editProject(projectIndex: number, name: string, description: string): Promise<void> {
        await projectsComponent.clickEditButton(projectIndex);
        await editProjectPage.setName(name);
        await editProjectPage.setDescription(description);
        await editProjectPage.submit();
    }

    async deleteProject(projectIndex: number): Promise<void> {
        await projectsComponent.clickDeleteButton(projectIndex);
    }
}

const projectActions = new ProjectActions();
export { projectActions };
