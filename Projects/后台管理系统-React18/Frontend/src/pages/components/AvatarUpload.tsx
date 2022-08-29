import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, message, Form } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { ResponseData } from '@/services/types'
import { RootState } from '@/store'
import type { User } from '@/types'
import type { FormInstance } from '@ant-design/pro-form'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadProps } from 'antd/es/upload/interface'
import type { Dispatch, SetStateAction } from 'react'


/**
 * Types
 */
interface AvatarUploadProps {
  initialAvatarUrl?: string
  changeSubmitterDisabled: Dispatch<SetStateAction<boolean>>
  formInstance: FormInstance
  name: string
  tempAvatarUrls: string[]
  setTempAvatarUrls: Dispatch<SetStateAction<string []>>
  currentUser: User | null
}


/**
 * Component
 */
const AvatarUpload = ({
  initialAvatarUrl = undefined,
  changeSubmitterDisabled,
  formInstance,
  name,
  tempAvatarUrls,
  setTempAvatarUrls,
  currentUser
}: AvatarUploadProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const apiBaseUrl = useSelector((state: RootState) => state.layout.apiBaseUrl)
  const assetBaseUrl = useSelector((state: RootState) => state.layout.assetBaseUrl)
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialAvatarUrl)

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 <= 2 // <= 2MB

    if (!isJpgOrPng) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.avatar.upload.type' }))
      return false
    }

    if (!isLt2M) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.avatar.upload.size' }))
      return false
    }

    return true
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
    const { file: { status, response } } = info

    if (status === 'uploading') {
      setUploading(true)
      changeSubmitterDisabled(true)
      return
    }

    if (status === 'error') {
      setUploading(false)
      changeSubmitterDisabled(false)
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return
    }

    if (status === 'done') {
      setUploading(false)
      changeSubmitterDisabled(false)

      if (response?.code !== 200) {
        void message.error(intl.formatMessage({ id: response?.msg ?? 'error.network' }), 3)
        return
      }

      const url = (response as ResponseData<string>).data

      setAvatarUrl(url)
      setTempAvatarUrls([...tempAvatarUrls, url])
      formInstance.setFieldsValue({ [name]: url })
      void message.success(intl.formatMessage({ id: response.msg }), 3)
      return
    }

    setUploading(false)
    changeSubmitterDisabled(false)
    return
  }

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {intl.formatMessage({ id: 'pages.admin.user-list.users.avatar.upload.text' })}
      </div>
    </div>
  )

  return (
    <Form.Item name={name}>
      <ImgCrop
        grid
        rotate
        aspect={1}
        shape="rect"
      >
        <Upload
          action={`${apiBaseUrl}/api/v1/upload-user-avatar`}
          beforeUpload={beforeUpload}
          disabled={!currentUser?.privilegeMap?.['UPLOAD_AVATAR']}
          headers={{ Authorization: localStorage.getItem('token') ?? '' }}
          listType="picture-card"
          method="post"
          name="file"
          showUploadList={false}
          onChange={handleChange}
        >
          {
            avatarUrl
              ? <img alt="avatar" src={`${assetBaseUrl}${avatarUrl}`} style={{ width: '100%' }} />
              : uploadButton
          }
        </Upload>
      </ImgCrop>
    </Form.Item>
  )
}

export default AvatarUpload
