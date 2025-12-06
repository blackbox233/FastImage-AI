'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import community from './communityWorks'
// import SiteStats from '@/components/SiteStats'
import { transferUrl } from '@/utils/locale'
import TencentAds from '@/components/TencentAds'

interface FAQItem {
  q: string;
  a: string;
}

export default function HomeClient() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const t = useTranslations('home')
  const tFriends = useTranslations('friends')
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const params = useParams()
  const locale = (params?.locale as string) || 'zh'
  const router = useRouter()


  // 示例图片数组
  const images = [
    '/images/demo-6.png',
    '/images/demo-12.png',
    '/images/demo-3.png',
    '/images/demo-1.png',
    '/images/demo-10.png',
    '/images/demo-8.png',
  ]

  // 自动轮播
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    timerRef.current = timer

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [images.length])

  // 手动切换图片时重置计时器
  const handleImageChange = (index: number) => {
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setCurrentImageIndex(index)

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    timerRef.current = timer
  }

  // 模拟社区作品数据
  const communityWorks = community

  const navigateToCreate = (promptText?: string) => {
    const query = promptText ? `?prompt=${encodeURIComponent(promptText)}` : ''
    router.push(transferUrl(`/create${query}`, locale))
  }

  const handleGenerateSame = (promptText: string) => {
    navigateToCreate(promptText)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-x-hidden">

      {/* 图片放大模态框 - 改进响应式设计 */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-gray-200/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fadeInUp"
          onClick={() => setZoomedImage(null)}
        >
          {/* 顶部控制栏 */}
          <div className="w-full max-w-[1400px] flex justify-end mb-4">
            <button
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors hover:scale-110 transform duration-300 bg-gray-100/50 rounded-full hover:bg-gray-200/50"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
              aria-label={t('banner.closeButton')}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 图片容器 */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-[1400px] max-h-[calc(100vh-8rem)] flex items-center justify-center">
              <Image
                src={zoomedImage}
                alt="Zoomed preview"
                width={1400}
                height={800}
                className="max-w-full max-h-[calc(100vh-8rem)] w-auto h-auto object-contain rounded-lg shadow-2xl border border-blue-400/30 animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                priority={false}
              />
            </div>
          </div>

          {/* 底部提示 */}
          <div className="w-full max-w-[1400px] mt-4 text-center text-sm text-gray-600">
            <p>{t('preview.closeHint')}</p>
          </div>
        </div>
      )}

      {/* 主要内容区域 - 使用 Tailwind CSS 控制布局 */}
      <main
        className="transition-all duration-300 mx-auto lg:pl-40 pt-24 lg:pt-0 pt-4"
      >
        {/* Hero Section - 改进响应式设计 */}
        <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-40 overflow-hidden lg:pt-24">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.05),rgba(249,115,22,0))] z-0"></div>
          <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-center opacity-20 z-0" style={{ position: 'fixed' }}></div>

          <div className="w-full max-w-[1400px] mx-auto relative px-6 sm:px-8 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 xl:gap-8 items-center">
              {/* 左侧文字内容 - 改进移动端间距 */}
              <div className="text-left">
                <div className="flex items-center gap-5 mb-8 sm:mb-12 animate-fadeInUp hidden md:flex">
                  <div className="relative">
                    <div className="absolute inset-0bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <Image
                      src="/images/可爱猫猫.png"
                      alt="Dreamifly Logo"
                      width={58}
                      height={58}
                      className="rounded-2xl shadow-xl border border-blue-400/30 relative z-10"
                      priority={true}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      FastImage Ai
                    </h2>
                    <p className="text-sm text-gray-700 mt-1">
                      {t('hero.description')}
                    </p>
                  </div>
                </div>
                <h1 className="mb-7 sm:mb-9 md:mt-0 mt-0">
                  <span className="block text-xl sm:text-2xl lg:text-4xl font-medium text-gray-800 mb-3 sm:mb-4 animate-fadeInUp">
                    {t('hero.titlePrefix')}
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent animate-fadeInUp animation-delay-200">
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-7 sm:mb-9 animate-fadeInUp animation-delay-300">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-400/75 to-indigo-400/75 text-gray-900 shadow-lg">
                    {t('hero.tags.fastGeneration')}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-400/75 to-cyan-400/75 text-gray-900 shadow-lg">
                    {t('hero.tags.multipleModels')}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/75 to-indigo-500/75 text-gray-900 shadow-lg">
                    {t('hero.tags.noLogin')}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-300/75 to-indigo-300/75 text-gray-900 shadow-lg">
                    {t('hero.tags.highCustomization')}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-400/75 to-indigo-400/75 text-gray-900 shadow-lg">
                    {t('hero.tags.chineseSupport')}
                  </span>
                </div>
                {/*<p className="text-base sm:text-lg text-gray-800 mb-7 sm:mb-9 animate-fadeInUp animation-delay-400">*/}
                {/*  {t('hero.subtitle.prefix')}*/}
                {/*  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent px-1.5">*/}
                {/*    {t('hero.subtitle.highlight')}*/}
                {/*  </span>*/}
                {/*  {t('hero.subtitle.suffix')}*/}
                {/*</p>*/}
                <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-600">
                  <button
                    onClick={() => navigateToCreate()}
                    className="group px-6 py-2.5 sm:px-9 sm:py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 text-sm sm:text-base font-medium relative overflow-hidden"
                  >
                    <span className="relative z-10">{t('hero.startButton')}</span>
                    <div className="absolute inset-0bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="group px-6 py-2.5 sm:px-9 sm:py-3.5 border-2 border-blue-500 text-blue-500 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-indigo-500/10 transition-all duration-300 text-sm sm:text-base font-medium relative overflow-hidden"
                  >
                    <span className="relative z-10">{t('hero.faqButton')}</span>
                    <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              {/* 右侧图片展示 - 改进响应式显示和尺寸控制 */}
              <div className="relative flex justify-end">
                <div className="relative w-full max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]">
                  <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gray-100/50 border border-blue-400/30 transform hover:scale-[1.02] transition-transform duration-500">
                    {images.map((src, index) => (
                      <div
                        key={src}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                          currentImageIndex === index
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`AI生成的图像示例 ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          sizes="(max-width: 768px) 350px, (max-width: 1024px) 400px, 450px"
                        />
                      </div>
                    ))}
                  </div>
                  {/* 最终优化的轮播图控件 - 精致的小圆点设计 */}
                  <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50/80 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl border border-blue-400/20">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageChange(index)}
                          className={`relative transition-all duration-300 ease-out group w-10 h-1.5 overflow-hidden`}
                          aria-label={`切换到图片 ${index + 1}`}
                        >
                          {/* 背景轨道 */}
                          <span className="absolute inset-0 rounded-full bg-slate-700/50" />

                          {/* 激活状态指示器 */}
                          <span className={`absolute inset-0 transition-all duration-500 ${
                            currentImageIndex === index
                              ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 shadow-lg shadow-blue-400/50'
                              : 'bg-blue-400/40 hover:bg-blue-400/60'
                          }`} />

                          {/* 脉冲动画效果 */}
                          {currentImageIndex === index && (
                            <span className="absolute inset-0 bg-blue-400 animate-ping opacity-20" />
                          )}

                          {/* 悬停光晕效果 */}
                          <span className={`absolute -inset-1 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 ${
                            currentImageIndex === index ? 'opacity-40' : ''
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - 改进响应式设计 */}
        {/*<section id="site-stats" className="py-8 sm:py-12 px-5 sm:px-8 lg:px-40 bg-gray-200/80 backdrop-blur-md relative">*/}

          {/*<div className="w-full max-w-[1260px] mx-auto relative px-4 sm:px-6">*/}
          {/*  <SiteStats />*/}
          {/*</div>*/}
        {/*</section>*/}

        {/* Tencent Ads - Above Community Section */}
        <div className="relative py-6 px-5 sm:px-8 lg:px-40 z-20">
          <div id="home-ad-above-community"></div>
          <TencentAds placementId="5222868351048167" containerId="home-ad-above-community" />
        </div>

        {/* Community Showcase Section - 改进响应式设计 */}
        <section id="community-showcase" className="py-14 sm:py-20 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-gray-50/90 backdrop-blur-md relative">

          <div className="w-full max-w-[1260px] mx-auto relative px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-15">
              <div className="flex items-center justify-center gap-5 mb-7">
                <Image
                  src="/common/社区.svg"
                  alt="Community"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  priority={false}
                />
                <h2 className="text-2xl font-bold text-gray-900 animate-fadeInUp">{t('community.title')}</h2>
              </div>
              <p className="text-lg text-gray-700 animate-fadeInUp animation-delay-200">{t('community.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {communityWorks.map((work, index) => (
                <div
                  key={work.id}
                  className="relative group animate-fadeInUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-400/30 transform hover:scale-[1.02] transition-transform duration-300">
                    <Image
                      src={work.image}
                      alt={`Community work ${work.id}`}
                      width={450}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-100/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-gray-900 text-sm mb-6 line-clamp-3">{work.prompt}</p>
                      <button
                        onClick={() => handleGenerateSame(work.prompt)}
                        className="group w-full py-2.5 px-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-gray-900 rounded-lg font-medium hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                      >
                        <span className="relative z-10">{t('community.generateSame')}</span>
                        <div className="absolute inset-0bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 添加优雅的描述文本 */}
            <div className="mt-10 text-center">
              <Link
                href="https://fizuclq6u3i.feishu.cn/share/base/form/shrcnQsyy6dMkoOSa1RjqeBrOQf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gray-600 hover:text-gray-800 text-base transition-colors duration-300 cursor-pointer group"
              >
                <span className="relative">
                  {t('community.sharePrompt.title')}
                  <span className="block text-gray-500 group-hover:text-gray-700 text-sm mt-1.5">
                    {t('community.sharePrompt.description')}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400/30 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="py-14 sm:py-24 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-gray-200/80 backdrop-blur-md relative">

          <div className="w-full max-w-[1260px] mx-auto relative px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 items-start gap-8 lg:gap-0">
              {/* 左侧图片 */}
              <div className="relative lg:col-span-2">
                <div className="lg:sticky lg:top-24">
                  <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gray-200/50 border border-blue-400/30 max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
                    <Image
                      src="/images/demo-12.png"
                      alt="FAQ illustration"
                      fill
                      className="object-cover rounded-2xl"
                      priority={false}
                    />
                  </div>
                </div>
              </div>

              {/* 间距列 */}
              <div className="hidden lg:block lg:col-span-1"></div>

              {/* 右侧FAQ内容 */}
              <div className="flex flex-col lg:col-span-2">
                <div className="flex items-center gap-5 mb-10">
                  <Image
                    src="/common/常见问题.svg"
                    alt="FAQ"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    priority={false}
                  />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('faq.title')}
                  </h2>
                </div>
                <div className="space-y-6 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {t.raw('faq.questions').map((qa: FAQItem, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-200/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30"
                    >
                      <h3 className="text-base font-semibold mb-4 text-gray-900">Q{index + 1}: {qa.q}</h3>
                      <p className="text-gray-700">{qa.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Friends Section - 友链区域 */}
        <section id="friends-section" className="py-14 sm:py-20 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-gray-50/90 backdrop-blur-md relative">

          <div className="w-full max-w-[1260px] mx-auto relative px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-15">
                             <div className="flex items-center justify-center gap-5 mb-7">
                 <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                   <path d="M546.9184 665.4976a187.9552 187.9552 0 0 1-133.3248-55.1424 25.6 25.6 0 0 1 36.1984-36.1984 137.472 137.472 0 0 0 194.2016 0l186.1632-186.1632c53.5552-53.5552 53.5552-140.6464 0-194.2016s-140.6464-53.5552-194.2016 0L478.8736 350.8736a25.6 25.6 0 0 1-36.1984-36.1984l157.0816-157.0816c73.5232-73.5232 193.1264-73.5232 266.5984 0s73.5232 193.1264 0 266.5984l-186.1632 186.1632a187.9552 187.9552 0 0 1-133.3248 55.1424z" />
                   <path d="M239.7184 972.6976a187.9552 187.9552 0 0 1-133.3248-55.1424 188.672 188.672 0 0 1 0-266.5984l186.1632-186.1632a188.672 188.672 0 0 1 266.5984 0 25.6 25.6 0 0 1-36.1984 36.1984 137.472 137.472 0 0 0-194.2016 0l-186.1632 186.1632c-53.5552 53.5552-53.5552 140.6464 0 194.2016s140.6464 53.5552 194.2016 0l157.0816-157.0816a25.6 25.6 0 0 1 36.1984 36.1984l-157.0816 157.0816a187.9552 187.9552 0 0 1-133.3248 55.1424z" />
                 </svg>
                 <h2 className="text-2xl font-bold text-gray-900 animate-fadeInUp">{tFriends('title')}</h2>
               </div>
               <p className="text-lg text-gray-700 animate-fadeInUp animation-delay-200">{tFriends('subtitle')}</p>
               <p className="text-base text-gray-600 mt-4 animate-fadeInUp animation-delay-300">{tFriends('description')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* AnyComfy 友链 */}
              <div className="group animate-fadeInUp animation-delay-400">
                <Link
                  href="https://anycomfy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-200/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-400/30 hover:border-blue-400/50"
                >
                                     <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                       <Image
                         src="/images/anycomfy.png"
                         alt="AnyComfy Logo"
                         width={48}
                         height={48}
                         className="w-full h-full object-cover"
                         priority={false}
                       />
                     </div>
                    <div>
                                             <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">{tFriends('anycomfy.name')}</h3>
                       <p className="text-sm text-gray-600">{tFriends('anycomfy.url')}</p>
                     </div>
                   </div>
                   <p className="text-gray-700 text-sm leading-relaxed">
                     {tFriends('anycomfy.description')}
                   </p>
                   <div className="mt-4 flex items-center text-blue-700 text-sm group-hover:text-blue-600 transition-colors">
                     <span>{tFriends('visitSite')}</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/*/!* 曼波配音生成器 友链 *!/*/}
              {/*<div className="group animate-fadeInUp animation-delay-500">*/}
              {/*  <Link*/}
              {/*    href="https://tools.dayun.cool/manbo"*/}
              {/*    target="_blank"*/}
              {/*    rel="noopener noreferrer"*/}
              {/*    className="block bg-gray-200/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-400/30 hover:border-blue-400/50"*/}
              {/*  >*/}
              {/*    <div className="flex items-center gap-4 mb-4">*/}
              {/*      <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">*/}
              {/*        <Image*/}
              {/*          src="/images/manbo.webp"*/}
              {/*          alt="曼波配音生成器 Logo"*/}
              {/*          width={48}*/}
              {/*          height={48}*/}
              {/*          className="w-full h-full object-cover"*/}
              {/*          priority={false}*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*      <div>*/}
              {/*        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">{tFriends('manbo.name')}</h3>*/}
              {/*        <p className="text-sm text-gray-600">{tFriends('manbo.url')}</p>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <p className="text-gray-700 text-sm leading-relaxed">*/}
              {/*      {tFriends('manbo.description')}*/}
              {/*    </p>*/}
              {/*    <div className="mt-4 flex items-center text-blue-700 text-sm group-hover:text-blue-600 transition-colors">*/}
              {/*      <span>{tFriends('visitSite')}</span>*/}
              {/*      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
              {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />*/}
              {/*      </svg>*/}
              {/*    </div>*/}
              {/*  </Link>*/}
              {/*</div>*/}
              {/* 基于 Dreamifly 开源项目 */}
              <div className="group animate-fadeInUp animation-delay-500">
                <Link
                    href="https://github.com/LastLighter/Dreamifly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-400/30 hover:border-blue-400/50"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">Dreamifly</h3>
                      <p className="text-sm text-gray-600">github.com/LastLighter/Dreamifly</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    本项目基于 Dreamifly 开源项目重构。原项目采用 ComfyUI 工作流架构，
                    现将其重构为 Stable Diffusion WebUI API 。
                  </p>
                  <div className="mt-4 flex items-center text-blue-700 text-sm group-hover:text-blue-600 transition-colors">
                    <span>访问原项目 GitHub</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </Link>
              </div>

                             <div className="group animate-fadeInUp animation-delay-600 opacity-60">
                 <div className="block bg-gray-300/30 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-400/20 border-dashed">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-gray-400/50 rounded-xl flex items-center justify-center">
                       <svg className="w-6 h-6 text-blue-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                       </svg>
                     </div>
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900/50">{tFriends('comingSoon.title')}</h3>
                       <p className="text-sm text-gray-700/40">{tFriends('comingSoon.subtitle')}</p>
                     </div>
                   </div>
                   <p className="text-gray-700/40 text-sm leading-relaxed">
                     {tFriends('comingSoon.description')}
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Footer Section - 改进响应式设计 */}
        {/*<section className="py-12 sm:py-18 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-gradient-to-br from-gray-50/80 via-gray-100/80 to-gray-50/80 backdrop-blur-md relative">*/}
        {/*    */}
        {/*  <div className="w-full max-w-[1260px] mx-auto relative px-4 sm:px-6">*/}
        {/*    <div className="text-center">*/}
        {/*      <p className="text-gray-700 text-sm mb-6 animate-fadeInUp">*/}
        {/*        {t('suanleme.title')}*/}
        {/*      </p>*/}
        {/*      <div className="flex justify-center items-center gap-10 animate-fadeInUp animation-delay-200">*/}
        {/*        <Link*/}
        {/*          href="https://gongjiyun.com"*/}
        {/*          target="_blank"*/}
        {/*          className="opacity-70 hover:opacity-100 transition-opacity transform hover:scale-105 duration-300"*/}
        {/*        >*/}
        {/*          <Image*/}
        {/*            src="https://www.gongjiyun.com/_astro/logo.DdOt3OC5_2scnhm.webp"*/}
        {/*            alt={t('suanleme.gongji')}*/}
        {/*            width={150}*/}
        {/*            height={25}*/}
        {/*            priority={false}*/}
        {/*          />*/}
        {/*        </Link>*/}
        {/*        <Link*/}
        {/*          href="https://suanleme.cn"*/}
        {/*          target="_blank"*/}
        {/*          className="opacity-70 hover:opacity-100 transition-opacity transform hover:scale-105 duration-300"*/}
        {/*        >*/}
        {/*          <Image*/}
        {/*            src="https://suanleme.cn/logo.svg"*/}
        {/*            alt={t('suanleme.suanleme')}*/}
        {/*            width={120}*/}
        {/*            height={40}*/}
        {/*            className="h-10"*/}
        {/*            priority={false}*/}
        {/*          />*/}
        {/*        </Link>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </main>
    </div>
  )
}