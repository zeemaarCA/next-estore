import Link from "next/link"

export const metadata = {
  title: 'About',
  description: 'Decora Shop is a place where you can find all the products you need for your home.',
}
export default function About() {
  return (
    <>
      <section className="pt-24 pb-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
            <div className="relative w-full text-center lg:text-left lg:w-2/4">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">Enjoy the finest features with our products</h2>
            </div>
            <div className="relative w-full text-center  lg:text-left lg:w-2/4">
              <p className="text-lg font-normal invert-slate-text mb-5">We provide all the advantages that can simplify all your financial transactions without any further requirements</p>
            </div>
          </div>
          <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div className="group relative w-full bg-invert rounded-2xl p-4 transition-all duration-150 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:!bg-primary">
              <div className="bg-invert rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z" stroke="#ff5885" strokeWidth={2} />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 capitalize transition-all duration-150 group-hover:text-white">Easy Payment</h4>
              <p className="text-sm font-normal invert-lslate-text transition-all duration-150 leading-5 group-hover:text-white">
                We Provide Various Methods For You To Carry Out All Transactions Related To Your Finances
              </p>
            </div>
            <div className="group relative w-full bg-invert rounded-2xl p-4 transition-all duration-150 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:!bg-primary">
              <div className="bg-invert rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.6071 14.375 9.6071C12.6491 9.6071 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571V20.8571M3.75 13.2264V15.2343C3.75 17.6868 3.75 18.9131 4.27747 19.9685C4.80493 21.0239 5.78567 21.76 7.74715 23.2322L8.57248 23.8516C11.4626 26.0208 12.9077 27.1054 14.5753 27.1054C16.243 27.1054 17.688 26.0208 20.5782 23.8516L21.4035 23.2322C23.365 21.76 24.3457 21.0239 24.8732 19.9685C25.4006 18.9131 25.4006 17.6868 25.4006 15.2343V13.2264C25.4006 9.95932 25.4006 8.32576 24.546 7.05852C23.6913 5.79128 22.1768 5.17918 19.1477 3.95499L18.3223 3.62144C16.4724 2.87381 15.5475 2.5 14.5753 2.5C13.6032 2.5 12.6782 2.87381 10.8283 3.62144L10.003 3.95499C6.97389 5.17919 5.45934 5.79128 4.60467 7.05852C3.75 8.32576 3.75 9.95932 3.75 13.2264Z" stroke="#ff5885" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 capitalize transition-all duration-150 group-hover:text-white">Safe Transaction</h4>
              <p className="text-sm font-normal invert-lslate-text transition-all duration-150 leading-5 group-hover:text-white">
                We have the most up-to-date security to support the security of all our customers in carrying out all transactions.
              </p>
            </div>
            <div className="group relative w-full bg-invert rounded-2xl p-4 transition-all duration-150 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:!bg-primary">
              <div className="bg-invert rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#ff5885" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 capitalize transition-all duration-150 group-hover:text-white">Fast Customer Service </h4>
              <p className="text-sm font-normal invert-lslate-text transition-all duration-150 leading-5 group-hover:text-white">
                Provide Customer Service For Those Of You Who Have Problems 24 Hours A Week
              </p>
            </div>
            <div className="group relative w-full bg-invert rounded-2xl p-4 transition-all duration-150 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:!bg-primary">
              <div className="bg-invert rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#ff5885" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 capitalize transition-all duration-150 group-hover:text-white">Quick Transaction</h4>
              <p className="text-sm font-normal invert-lslate-text transition-all duration-150 leading-5 group-hover:text-white">
                We provide faster transaction speeds than competitors, so money arrives and is received faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative lg:py-14 lg:px-20 p-10 rounded-2xl bg-gradient-to-r dark:from-supernova-400 dark:to-supernova-500 from-cgreen-500 to-green-600 flex items-center justify-between flex-col lg:flex-row">
            <div className="block text-center mb-5 lg:text-left lg:mb-0">
              <h2 className="font-manrope text-4xl text-white font-semibold mb-5 lg:mb-2">
                Connect with us
              </h2>
              <p className="text-xl text-white">
                Contact us with any query or any idea.
              </p>
            </div>
            <Link href="/contact" className="flex items-center gap-2 bg-green-200 dark:bg-yellow-600 rounded-full shadow-md text-lg text-slate-800 font-semibold py-4 px-8 transition-all duration-150">Get In Touch
              <svg width={19} height={14} viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.75 7L16.4167 7M11.8333 12.5L16.6852 7.64818C16.9907 7.34263 17.1435 7.18985 17.1435 7C17.1435 6.81015 16.9907 6.65737 16.6852 6.35182L11.8333 1.5" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* CTA */}

      {/* stats numbers */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 xl:gap-14 lg:flex-row lg:justify-between">
            <div className="w-full lg:w-1/3 ">
              <div className="font-manrope font-bold text-5xl text-primary mb-6 text-center ">
                13M+
              </div>
              <p className="text-lg invert-lslate-text leading-7 text-center">We have reach more than 13 millions user in around the world</p>
            </div>
            <div className="w-full lg:w-1/3 ">
              <div className="font-manrope font-bold text-5xl text-primary mb-6 text-center ">
                50M+
              </div>
              <p className="text-lg invert-lslate-text leading-7 text-center">Pagedone is one of most downloaded on google play store &amp; apple store</p>
            </div>
            <div className="w-full lg:w-1/3 ">
              <div className="font-manrope font-bold text-5xl text-primary mb-6 text-center ">
                98%
              </div>
              <p className="text-lg invert-lslate-text leading-7 text-center">Our user are satisfied using our services  in their daily site</p>
            </div>
          </div>
        </div>
      </section>


      {/* stats numbers */}




    </>
  )
}
