import type { App } from 'vue';
import type { CoreOptions } from '../types/options';
import deepmerge from 'deepmerge';

// Vuetify
import { type VuetifyOptions, createVuetify } from 'vuetify';
import { en, fr } from 'vuetify/locale';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { VBtn } from 'vuetify/components';

/**
 * Register vuetify plugin.
 * @param app App instance.
 * @param coreOptions Core options.
 */
export const registerVuetify = (app: App, coreOptions: CoreOptions) => {
  const defaultVuetifyOptions: VuetifyOptions = {
    theme: {
      themes: {
        light: {
          colors: {
            background: '#fcfcfc',
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    locale: {
      messages: {
        en,
        fr,
      },
    },
    aliases: {
      VBtnAction: VBtn,
    },
    defaults: {
      // Containment
      VBtnAction: {
        variant: 'tonal',
        rounded: true,
      },
      VCard: {
        class: 'multi-line',
      },
      VCardTitle: {
        class: 'multi-line',
      },
      VCardSubtitle: {
        class: 'multi-line',
      },
      VCardText: {
        class: 'multi-line',
      },
      VDialog: {
        VForm: {
          class: 'fill-height overflow-y-auto',
        },
      },
      VListItemTitle: {
        class: 'multi-line',
      },
      VListItemSubtitle: {
        class: 'multi-line',
      },
      VListSubheader: {
        class: 'multi-line',
      },
      // Form inputs & controls
      VInput: {
        variant: 'underlined',
        hideDetails: 'auto',
        persistentHint: true,
      },
      VFileInput: {
        variant: 'underlined',
        density: 'comfortable',
        hideDetails: 'auto',
        persistentHint: true,
        clearable: false,
        class: 'mb-3',
      },
      VTextarea: {
        variant: 'underlined',
        density: 'comfortable',
        hideDetails: 'auto',
        persistentHint: true,
        class: 'mb-3',
        autoGrow: true,
        rows: 3,
      },
      VTextField: {
        variant: 'underlined',
        density: 'comfortable',
        hideDetails: 'auto',
        persistentHint: true,
        class: 'mb-3',
      },
      VSwitch: {
        density: 'comfortable',
        hideDetails: 'auto',
        persistentHint: true,
        class: 'mb-3',
        color: 'primary',
      },
      // Feedback
      VTimeline: {
        align: 'start',
        density: 'compact',
        side: 'end',
        VTimelineItem: {
          lineInset: 2,
        },
      },
    },
  };

  const vuetifyOptions = deepmerge(defaultVuetifyOptions, coreOptions.vuetify || {});
  const vuetify = createVuetify(vuetifyOptions);

  app.use(vuetify);

  return vuetify;
};

declare module '@vue/runtime-core' {
  /** Extended global components. */
  export interface GlobalComponents {
    VBtnAction: typeof import('vuetify/components/VBtn')['VBtn']
  }
}
