
const defaultProject = {
    id: 0,
    name: 'no project name',
    items: [],
    uid: {},
    tags: [],
    settings: {
        permissions: 0,
        allowPublic: false,
        toneOptions: {

        }
    },
    
};

export const processItemData = (data) => {
    if (data.key) {
        // this data has already been processed so returning that.
        return data;
    }

    const revisions = data.revisions || [];

    const newData = {

        id: data.id || data._id,
        originalName: data.originalName,
        displayName: data.displayName,
        duration: data.duration,

        // useindprojects: [projectIDs]
        uid: data.uid,
        tags: data.tags,
        settings: data.settings,
        revisions: revisions.map((r) => processItemData(r)),
        isRevision: data.isRevision,
        revisionCount: revisions.length,
        revisionOf: data.revisionOf,
        stems: data.stems,
        sequenceNumber: data.sequenceNumber,


        rating: data.rating,
        soundType: data.soundType,
        loop: data.loop
    };

    if (data.stems && data.stems.length) {
        newData.stems = data.stems;

        newData.key = data.stems[0].key || 0;
    }

    if (data.metaData) {
        newData.metaData = data.metaData;
    } else {
        newData.metaData = {
            info: ''
        }
    }

    if (data.projectData) {
        newData.projectData = data.projectData;
    }

    // const fileWithDuration = data.mediaItem.files
    //   .find(file => !!file.meta?.duration);

    // newData.duration = fileWithDuration ? fileWithDuration.meta.duration : 0;

    return newData;
};

export const processProjectData = (data) => {




    // const newData = {
    //   dbData: data,
    //   id: data.id || data._id,
    //   originalName: data.originalName,
    //   displayName: data.displayName,
    //   // key: data.mediaItem.key,
    //   key: data.stems[0].key,
    //   // useindprojects: [projectIDs]
    //   uid: data.uid,
    //   tags: data.tags,
    //   settings: data.settings,
    //   revisions: ['itemIds'],
    //   isRevisionOf: 'itemId',
    //   stems: data.stems
    // };


    if (data.subProjects) {
        data.subProjects.forEach(subProject => {
            subProject.items = subProject.items.map(i => processItemData(i))

        })
    }

    return data;
};

export const state = () => ({
    showPasswordDialog: false,
    project: defaultProject,
    isLoading: true

});

export const getters = {
    getProjectById: state => id => {
        return state.projects.find(project => project.id === id);
    },


};

export const mutations = {
    SET_PROJECT(state, payload) {

        if (!payload) {
            state.project = defaultProject;

        } else {

            state.project = processProjectData(payload);
        }


    },

    SET_SHOWPASSWORDDIALOG(state, payload) {
        state.showPasswordDialog = payload;
    },

    SET_ISLOADING(state, payload) {
        state.isLoading = payload;
    },

    TOGGLE_SETTINGS(state, payload) {
        state.project.settings.toneOptions.showFx = !state.project.settings.toneOptions.showFx;
    },
};

export const actions = {


    getPublicProject({ commit, state, dispatch }, payload) {

        const apiRoot = process.env.NODE_ENV == 'production' ? 'https://hqapi.plan8.co/v1' : 'http://localhost:3000/v1';


        const projectPath = `${apiRoot}/projects/${payload.projectId}/public`;


        commit("SET_ISFETCHING", true, { root: true });
        return this.$axios.get(projectPath)
            .then(response => {/*  */


                // commit("SET_ISFETCHING", false, { root: true });


                commit("SET_PROJECT", response.data);
                return response
            }).catch(error => {

                if (error.response) {
                    if (error.response.status == 428) {

                        // commit("SET_ISFETCHING", false, { root: true });
                        //commit('SET_SHOWPASSWORDDIALOG', true)
                        return error;
                    }

                }

            })

    },

    async downloadProject({ commit, state }, payload) {


        try {
            commit("SET_ISFETCHING", true, { root: true });
            const downloadUrl = await this.$plan8Api.projects.download(payload);

            commit("SET_ISFETCHING", false, { root: true });
            window.open(downloadUrl, "_blank");
        } catch (error) {


        }

    }
};

