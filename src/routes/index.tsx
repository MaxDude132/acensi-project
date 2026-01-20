import { createFileRoute } from '@tanstack/react-router'
import {
  Container,
  Title,
  Text,
  Stack,
  Paper,
  TextInput,
  Group,
  Button,
  Table,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { PageHead } from '@/components'
import { APP_NAME, APP_DESCRIPTION } from '@/config/env'
import { useCallback, useEffect, useState } from 'react'

type Currency = 'USD' | 'EUR'

interface PreviousConversion {
  fromCurrency: Currency
  toCurrency: Currency
  fromValue: string
  toValue: string
  time: Date
  rate: number
  overridenRate: string
  usedOveridenRate: boolean
}

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { t } = useTranslation()

  const [rate, setRate] = useState<number>(1.1)
  const [overridenRate, setOverridenRate] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD')
  const otherCurrency = currentCurrency === 'USD' ? 'EUR' : 'USD'
  const [previousConversions, setPreviousConversions] = useState<PreviousConversion[]>([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRate((prevRate) => {
        const change = (Math.random() - 0.5) * 0.1
        return prevRate + change
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  const [lastStoredConversion, setLastStoredConversion] = useState<string>('')

  const getRateToUse = useCallback((): number => {
    const numberOverridenRate =
      overridenRate === '' ? rate : Number(overridenRate.replace(',', '.'))
    const isNotWithinTwoPercent = Math.abs(numberOverridenRate - rate) / rate > 0.02
    return isNaN(numberOverridenRate) || isNotWithinTwoPercent ? rate : numberOverridenRate
  }, [overridenRate, rate])

  function convertValue() {
    if (value === '') return '0.0'
    const numericValue = Number(value)
    if (isNaN(numericValue)) return '0.0'

    const rateToUse = getRateToUse()
    return (
      currentCurrency === 'USD' ? numericValue * rateToUse : numericValue / rateToUse
    ).toFixed(2)
  }

  const convertedValue = convertValue()

  useEffect(() => {
    const conversionKey = `${currentCurrency}-${value}-${convertedValue}`

    if (
      convertedValue !== '0.00' &&
      convertedValue !== '0.0' &&
      conversionKey !== lastStoredConversion
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviousConversions((prev) => [
        {
          fromCurrency: currentCurrency,
          toCurrency: otherCurrency,
          fromValue: value,
          toValue: convertedValue,
          time: new Date(),
          rate,
          overridenRate,
          usedOveridenRate:
            overridenRate !== '' && Number(overridenRate.replace(',', '.')) === getRateToUse(),
        },
        ...prev,
      ])
      setLastStoredConversion(conversionKey)
    }
  }, [
    convertedValue,
    currentCurrency,
    value,
    otherCurrency,
    lastStoredConversion,
    getRateToUse,
    rate,
    overridenRate,
  ])

  function switchConversion() {
    setCurrentCurrency((prev) => (prev === 'USD' ? 'EUR' : 'USD'))
    setValue(convertedValue)
  }

  return (
    <>
      <PageHead title={t('common.home')} description={APP_DESCRIPTION} />
      <Container size="lg">
        <Stack gap="xl">
          <div>
            <Title order={2}>{t('home.welcome', { appName: APP_NAME })}</Title>
            <Text c="dimmed" mt="sm">
              {t('home.description')}
            </Text>
          </div>

          <Paper p="md" withBorder maw="400">
            <Text fw={600}>
              {t('converter.currentRate')}: {rate.toFixed(2)}
            </Text>

            <TextInput
              mt="sm"
              label={t('converter.overrideRate')}
              value={overridenRate}
              onChange={(event) => setOverridenRate(event.currentTarget.value)}
            />

            <Group mt="sm" align="start">
              <TextInput
                label={t('converter.amount', { currency: currentCurrency })}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
              <Text fw={700} size="xl">
                {convertedValue} {otherCurrency}
              </Text>
            </Group>
            <Button mt="sm" onClick={switchConversion}>
              {t('converter.convertFrom', { currency: otherCurrency })}
            </Button>

            <Text mt="sm" c="dimmed" fz="sm">
              {t('converter.rateOverrideHint')}
            </Text>
          </Paper>

          <Title order={3}>{t('converter.previousConversions')}</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('converter.time')}</Table.Th>
                <Table.Th>{t('converter.rate')}</Table.Th>
                <Table.Th>{t('converter.rateOverride')}</Table.Th>
                <Table.Th>{t('converter.initialValue')}</Table.Th>
                <Table.Th>{t('converter.convertedValue')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {previousConversions.slice(0, 5).map((conversion, index) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{conversion.time.toLocaleTimeString()}</Table.Td>
                    <Table.Td fw={!conversion.usedOveridenRate ? 700 : 500}>
                      {conversion.rate.toFixed(2)}
                    </Table.Td>
                    <Table.Td fw={conversion.usedOveridenRate ? 700 : 500}>
                      {conversion.overridenRate}
                    </Table.Td>
                    <Table.Td>
                      {conversion.fromValue} {conversion.fromCurrency}
                    </Table.Td>
                    <Table.Td>
                      {conversion.toValue} {conversion.toCurrency}
                    </Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.Tbody>
          </Table>
        </Stack>
      </Container>
    </>
  )
}
