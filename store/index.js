
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
    }
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
};

export const actions = {


    getPublicProject({ commit, state, dispatch }, payload) {


        commit("SET_ISFETCHING", true, { root: true });
        return this.$plan8Api.projects.getPublic(payload)
            .then(response => {/*  */


                commit("SET_ISFETCHING", false, { root: true });


                commit("SET_PROJECT", response);
                return response
            }).catch(error => {

                if (error.response) {
                    if (error.response.status == 428) {

                        commit("SET_ISFETCHING", false, { root: true });
                        commit('SET_SHOWPASSWORDDIALOG', true)
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

