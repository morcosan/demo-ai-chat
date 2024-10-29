import { Account } from '@app/biz-modules/user-settings/api'
import { AppLayout } from '@app/layouts/app-layout'
import { ErrorSummary, PageHeader, SuccessNotice } from '@app/library/release'
import { Button } from '@ds/release'
import { useCallback, useEffect, useState } from 'react'
import { DataField, Field } from '../components/data-field'
import { ACCOUNT_EMPTY, useUserAccount } from '../state'

type AccountRecord = Partial<Record<keyof Account, string>>

const AccountPage = () => {
	const { account, accountLoading, updateAccount } = useUserAccount()
	const [payload, setPayload] = useState<Account>(ACCOUNT_EMPTY)
	const [feedback, setFeedback] = useState<AccountRecord>(ACCOUNT_EMPTY)
	const [successful, setSuccessful] = useState(false)

	const legendClass = cx('mb-sm-3 text-size-lg text-color-text-subtle')

	const publicFields: Field<keyof Account>[] = [
		{ key: 'name', label: t('userAccount.label.name') },
		{ key: 'avatar', label: t('userAccount.label.avatar') },
	]

	const privateFields: Field<keyof Account>[] = [
		{ key: 'email', label: t('userAccount.label.email') },
		{ key: 'phone', label: t('userAccount.label.phone'), optional: true },
	]

	const canSave =
		account.name !== payload.name.trim() ||
		account.avatar !== payload.avatar.trim() ||
		account.email !== payload.email.trim() ||
		account.phone !== payload.phone.trim()

	const hasErrors = (errors: object) => Object.values(errors).some((value: string) => value)

	const onSubmit = useCallback(async () => {
		const validation = {
			name: !payload.name.trim() ? t('userAccount.error.name') : '',
			avatar: !payload.avatar.trim() ? t('userAccount.error.avatar') : '',
			email: !payload.email.trim() ? t('userAccount.error.email') : '',
		}
		setFeedback(validation)

		if (!hasErrors(validation)) {
			setSuccessful(false)

			await updateAccount(payload)

			setFeedback(ACCOUNT_EMPTY)
			setSuccessful(true)
			wait(3000).then(() => setSuccessful(false))
		}
	}, [payload])

	useEffect(() => {
		setPayload(account)
	}, [account])

	return (
		<AppLayout blank>
			<PageHeader
				breadcrumb={{ href: '/settings', title: t('core.label.settings') }}
				slotTitle={t('userAccount.label.account')}
			/>

			{/* ERRORS */}
			{hasErrors(feedback) && <ErrorSummary errors={feedback} />}

			{/* FIELDS */}
			<form className="mt-sm-1">
				<fieldset className="flex flex-col gap-y-sm-1">
					<legend className={legendClass}>{t('userAccount.label.publicData')}</legend>

					<div className="flex flex-col-reverse items-center gap-sm-1 sm:flex-row">
						<div className="flex w-full flex-col gap-y-sm-1 sm:flex-1">
							{publicFields.map((field: Field<keyof Account>) => (
								<DataField
									key={field.key}
									field={field}
									value={payload[field.key]}
									error={feedback[field.key]}
									disabled={Boolean(accountLoading)}
									onChange={(value: string) => setPayload({ ...payload, [field.key]: value })}
								/>
							))}
						</div>

						<img
							src={payload.avatar}
							alt=""
							className="h-md-5 w-md-5 rounded-full border border-color-border-subtle bg-color-bg-field"
						/>
					</div>
				</fieldset>

				<fieldset className="mt-md-2 flex flex-col gap-y-sm-1">
					<legend className={legendClass}>{t('userAccount.label.privateData')}</legend>

					{privateFields.map((field: Field<keyof Account>) => (
						<DataField
							key={field.key}
							field={field}
							value={payload[field.key]}
							error={feedback[field.key]}
							disabled={Boolean(accountLoading)}
							onChange={(value: string) => setPayload({ ...payload, [field.key]: value })}
						/>
					))}
				</fieldset>
			</form>

			{/* SAVING */}
			<div className="mt-md-2">
				<Button
					disabled={!canSave}
					loading={Boolean(accountLoading)}
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
