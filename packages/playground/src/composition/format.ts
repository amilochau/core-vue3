import { mdiAccountClock, mdiAlertCircle, mdiArchive } from '@mdi/js'
import { useI18n } from 'vue-i18n'
import { ContactStatus } from '../types/contacts'

export type FormattedData<TData> = {
  value: TData
  title: string
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
    formatContactStatus: (status: ContactStatus): FormattedData<ContactStatus> => {
      switch (status) {
        case ContactStatus.New: {
          return {
            value: ContactStatus.New,
            title: t('format.contactStatuses.new'),
            icon: mdiAlertCircle,
            color: 'info'
          }
        }
        case ContactStatus.InProgress: {
          return {
            value: ContactStatus.InProgress,
            title: t('format.contactStatuses.inProgress'),
            icon: mdiAccountClock,
            color: 'warning'
          }
        }
        case ContactStatus.Closed: {
          return {
            value: ContactStatus.Closed,
            title: t('format.contactStatuses.closed'),
            icon: mdiArchive,
            color: 'success'
          }
        }
      }
    }
  }
}
