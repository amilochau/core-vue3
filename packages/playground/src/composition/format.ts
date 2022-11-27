import { mdiAccountClock, mdiAlertCircle, mdiArchive } from '@mdi/js'
import { useI18n } from 'vue-i18n'
import { ContactStatus } from '../types/contacts'

export class FormatData {
  text?: string
  icon?: string
  color?: string
}

export function useFormat() {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    format: {
      contactStatuses: {
        new: "New",
        inProgress: "In progress",
        closed: "Closed"
      }
    }
  })
  mergeLocaleMessage('fr', {
    format: {
      contactStatuses: {
        new: "Nouveau",
        inProgress: "En cours",
        closed: "Fermé"
      }
    }
  })

  return {
    formatContactStatus: (status: ContactStatus): FormatData => {
      switch (status) {
        case ContactStatus.New: {
          return {
            text: t('format.contactStatuses.new'),
            icon: mdiAlertCircle,
            color: 'info'
          }
        }
        case ContactStatus.InProgress: {
          return {
            text: t('format.contactStatuses.inProgress'),
            icon: mdiAccountClock,
            color: 'warning'
          }
        }
        case ContactStatus.Closed: {
          return {
            text: t('format.contactStatuses.closed'),
            icon: mdiArchive,
            color: 'success'
          }
        }
      }
    }
  }
}
