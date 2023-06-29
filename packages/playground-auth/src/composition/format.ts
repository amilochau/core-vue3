import type { FormattedData } from '@amilochau/core-vue3'
import { mdiAccountClock, mdiAlertCircle, mdiArchive } from '@mdi/js'
import { useI18n } from 'vue-i18n'
import { ContactStatus } from '../types/contacts'

export function useFormat() {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    contactStatuses: {
      new: "New",
      inProgress: "In progress",
      closed: "Closed"
    }
  })
  mergeLocaleMessage('fr', {
    contactStatuses: {
      new: "Nouveau",
      inProgress: "En cours",
      closed: "Fermé"
    }
  })

  return {
    formatContactStatus: (status: ContactStatus): FormattedData<ContactStatus> => {
      switch (status) {
        case ContactStatus.New: {
          return {
            value: ContactStatus.New,
            title: t('contactStatuses.new'),
            icon: mdiAlertCircle,
            color: 'info'
          }
        }
        case ContactStatus.InProgress: {
          return {
            value: ContactStatus.InProgress,
            title: t('contactStatuses.inProgress'),
            icon: mdiAccountClock,
            color: 'warning'
          }
        }
        case ContactStatus.Closed: {
          return {
            value: ContactStatus.Closed,
            title: t('contactStatuses.closed'),
            icon: mdiArchive,
            color: 'success'
          }
        }
      }
    }
  }
}
