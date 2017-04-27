import { observable, computed, useStrict, action, runInAction } from 'mobx';
import Project from '../models/Project';
import Image from '../models/Image';
import Video from '../models/Video';
import ProjectCategory from '../models/ProjectCategory';

useStrict( true );

export default class PortfolioStore {
    @observable private projectMap: Map<number, Project> = new Map();
    @observable private projectCategoryMap: Map<number, ProjectCategory> = new Map();
    @observable private imageMap: Map<number, Image> = new Map();
    @observable private videoMap: Map<number, Video> = new Map();

    @action addProject( ...projects: Project[] ) {
        runInAction(() => {
            [ ...projects ]
                .sort( ( a, b ) => a.date.getTime() - b.date.getTime() )
                .forEach( project => {
                    this.projectMap.set( project.id, project );

                    // map Images to Project
                    project.images.forEach( ( image, imageId ) => {
                        project.imageMap.set( imageId, this.imageMap.get( imageId ) );
                    });

                    // map Videos to Project
                    project.videos.forEach( ( video, videoId ) => {
                        project.videoMap.set( videoId, this.videoMap.get( videoId ) );
                    });

                    // map ProjectCategories <==> Project
                    project.categoryMap.forEach(( projectCategory, projectCategoryId ) => {
                        projectCategory = projectCategory
                            ? projectCategory
                            : this.projectCategoryMap.get( projectCategoryId );
                        project.categoryMap.set( projectCategoryId, projectCategory );
                        projectCategory.projectMap.set( project.id, project );
                    });
                });
        });
    }

    @computed get projects(): Project[] {
        return Array.from( this.projectMap, value => value[ 1 ] );
    }

    @action addProjectCategory( ...projectCategories: ProjectCategory[] ) {
        runInAction(() => {
            [ ...projectCategories ].forEach( projectCategory => {
                this.projectCategoryMap.set( projectCategory.id, projectCategory );

                // map Projects to ProjectCategories
                projectCategory.projectMap.forEach( ( project, projectId ) => {
                    if ( projectCategory.projectMap.has( project.id ) ) {
                        projectCategory.projectMap.set( projectId, project );
                    }
                });

                // map ProjectCategories to Projects
                this.projectMap.forEach( ( project, projectId ) => {
                    if ( project.categoryMap.has( projectCategory.id ) ) {
                        project.categoryMap.set( projectCategory.id, projectCategory );
                    }
                });
            });
        });
    }

    @computed get projectCategories(): ProjectCategory[] {
        return Array.from( this.projectCategoryMap, value => value[ 1 ] );
    }

    @action addImage( ...images: Image[] ) {
        runInAction(() => {
            [ ...images ].forEach( image => {
                this.imageMap.set( image.id, image );
            });
        });
    }

    @action addVideo( ...videos: Video[] ) {
        runInAction(() => {
            [ ...videos ].forEach( video => {
                this.videoMap.set( video.id, video );

                // map Video to Project
                this.projectMap.forEach( project => {
                    if ( project.videoMap.has( video.id ) ) {
                        project.videoMap.set( video.id, video );
                    }
                });
            });
        });
    }

    getProjectCategoryById( id: number ): ProjectCategory {
        return this.projectCategoryMap.get( id );
    }

    getPreviousProject( project: Project, projectCategory?: ProjectCategory ): Project {
        let projects = this.projects;
        if ( projectCategory ) {
            projects = this.projectCategoryMap.get( projectCategory.id ).projects;
        }
        const index = projects.indexOf( project );
        if ( index <= 0 ) {
            return projects[ projects.length - 1 ];
        }

        return projects[ index - 1 ];
    }

    getNextProject( project: Project, projectCategory?: ProjectCategory ): Project {
        let projects = this.projects;
        if ( projectCategory ) {
            projects = this.projectCategoryMap.get( projectCategory.id ).projects;
        }
        const index = projects.indexOf( project );
        if ( index >= projects.length - 1 ) {
            return projects[ 0 ];
        }

        return projects[ index + 1 ];
    }
}