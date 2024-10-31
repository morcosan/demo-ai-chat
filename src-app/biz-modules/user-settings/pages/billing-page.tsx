import { AppLayout } from '@app/layouts/app-layout'
import { ErrorSummary, PageHeader, SuccessNotice } from '@app/library/release'
import { Button } from '@ds/release'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Billing } from '../api'
import { DataField, Field } from '../components/data-field'
import { BILLING_EMPTY, useUserAccount } from '../state'

type BillingRecord = Partial<Record<keyof Billing, string>>

const AccountPage = () => {
	useTranslation()
	const { billing, billingLoading, updateBilling } = useUserAccount()
	const [payload, setPayload] = useState<Billing>(BILLING_EMPTY)
	const [feedback, setFeedback] = useState<BillingRecord>(BILLING_EMPTY)
	const [successful, setSuccessful] = useState(false)

	const fields: Field<keyof Billing>[] = [
		{ key: 'name', label: t('userSettings.label.legalName') },
		{ key: 'address', label: t('userSettings.label.address'), props: { minRows: 2, maxRows: 4, multiline: true } },
		{ key: 'city', label: t('userSettings.label.city') },
		{ key: 'country', label: t('userSettings.label.country') },
		{ key: 'postalCode', label: t('userSettings.label.postalCode') },
		{ key: 'vatNumber', label: t('userSettings.label.vatNumber'), optional: true },
	]

	const canSave =
		billing.name !== payload.name.trim() ||
		billing.address !== payload.address.trim() ||
		billing.city !== payload.city.trim() ||
		billing.country !== payload.country.trim() ||
		billing.postalCode !== payload.postalCode.trim() ||
		billing.vatNumber !== payload.vatNumber.trim()

	const hasErrors = (errors: object) => Object.values(errors).some((value: string) => value)

	const onSubmit = useCallback(async () => {
		const validation = {
			name: !payload.name.trim() ? t('userSettings.error.legalName') : '',
			address: !payload.address.trim() ? t('userSettings.error.address') : '',
			city: !payload.city.trim() ? t('userSettings.error.city') : '',
			country: !payload.country.trim() ? t('userSettings.error.country') : '',
			postalCode: !payload.postalCode.trim() ? t('userSettings.error.postalCode') : '',
		}
		setFeedback(validation)

		if (!hasErrors(validation)) {
			setSuccessful(false)

			await updateBilling(payload)

			setFeedback(BILLING_EMPTY)
			setSuccessful(true)
			wait(3000).then(() => setSuccessful(false))
		}
	}, [payload])

	useEffect(() => {
		setPayload(billing)
	}, [billing])

	return (
		<AppLayout blank>
			<PageHeader
				breadcrumb={{ href: '/settings', title: t('core.label.settings') }}
				slotTitle={t('userSettings.label.billing')}
			/>

			{/* ERRORS */}
			{hasErrors(feedback) && <ErrorSummary errors={feedback} />}

			{/* FIELDS */}
			<form className="mt-sm-1 flex flex-col gap-y-sm-1">
				{fields.map((field: Field<keyof Billing>) => (
					<DataField
						key={field.key}
						field={field}
						value={payload[field.key]}
						error={feedback[field.key]}
						disabled={Boolean(billingLoading)}
						onChange={(value: string) => setPayload({ ...payload, [field.key]: value })}
					/>
				))}
			</form>

			{/* SAVING */}
			<div className="mt-sm-9">
				<Button
					disabled={!canSave}
					loading={Boolean(billingLoading)}
					variant="solid-primary"
					className="w-full sm:w-fit"
					onClick={onSubmit}
				>
					{t('core.action.saveChanges')}
				</Button>

				{Boolean(successful) && <SuccessNotice text={t('core.state.dataSaved')} className="mt-xs-5" />}
			</div>
		</AppLayout>
	)
}

export default AccountPage
