import { Menu, ActionIcon } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg" aria-label="Change language">
          <IconLanguage size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {languages.map(({ code, label }) => (
          <Menu.Item
            key={code}
            onClick={() => i18n.changeLanguage(code)}
            fw={i18n.language === code ? 600 : 400}
            bg={i18n.language === code ? "var(--mantine-primary-color-light)" : undefined}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default LanguageSwitcher
