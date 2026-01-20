import { Helmet } from '@dr.pogodin/react-helmet'
import { APP_NAME, APP_DESCRIPTION } from '@/config/env'

interface PageHeadProps {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
}

function PageHead({
  title,
  description = APP_DESCRIPTION,
  keywords = [],
  image,
  url,
}: PageHeadProps) {
  const fullTitle = `${APP_NAME} | ${title}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

export default PageHead
