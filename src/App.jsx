import { useEffect, useRef } from 'react'
import logoImage from './assets/SutiExpenseEdit.png'
import playBadge from './assets/PlayBadge.png'
import appleBadge from './assets/AppleBadge.png'
import marqLogo from './assets/marq_logo.png'
import './index.css'

function App() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width, height
    const particles = []

    const colors = ['#1a56ff', '#007bff', '#00c3ff', '#33ccff']

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 20 + 15
        this.color = colors[Math.floor(Math.random() * colors.length)] + this.getRandOpacity()
        this.rotation = Math.random() * Math.PI * 2
        this.speedY = Math.random() * 0.4 + 0.1
        this.speedX = (Math.random() - 0.5) * 0.3
        this.rotSpeed = (Math.random() - 0.5) * 0.015
        this.shapeType = Math.random() > 0.5 ? 0 : 1
      }

      getRandOpacity() {
        const randRaw = Math.floor(Math.random() * (255 - 1))
        return randRaw.toString(16).padStart(2, '0').toUpperCase()
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillStyle = this.color
        ctx.beginPath()

        if (this.shapeType === 0) {
          ctx.moveTo(0, -this.size)
          ctx.quadraticCurveTo(this.size, 0, 0, this.size)
          ctx.quadraticCurveTo(-this.size, 0, 0, -this.size)
        } else {
          const w = this.size * 1.4
          const r = w * 0.35

          if (ctx.roundRect) {
            ctx.roundRect(-w / 2, -w / 2, w, w, r)
          } else {
            ctx.rect(-w / 2, -w / 2, w, w)
          }
        }

        ctx.fill()
        ctx.restore()
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX
        this.rotation += this.rotSpeed

        if (this.y < -this.size * 2) {
          this.y = height + this.size * 2
          this.x = Math.random() * width
        }
      }
    }

    function initParticles() {
      particles.length = 0

      const numParticles = Math.min(Math.floor(window.innerWidth / 40), 50)

      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
      }
    }

    let lastWidth = window.innerWidth

    function handleParticleResize() {
      if (Math.abs(window.innerWidth - lastWidth) > 100) {
        initParticles()
        lastWidth = window.innerWidth
      }
    }

    window.addEventListener('resize', handleParticleResize)

    initParticles()

    let animationFrameId

    function animate() {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', handleParticleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

      <div className="flex flex-col justify-center max-w-full w-full" ref={containerRef}>
        <header className="flex items-center sticky top-0 w-full h-13 sm:h-17 z-50 bg-[rgba(255,255,255,0.92)] backdrop-blur-md px-4 shadow-md">
          <img
            src={marqLogo}
            className="h-3/4 w-32 sm:w-52 invert object-scale-down"
            alt="Marquette logo"
          />
        </header>

        <div className="flex flex-col max-w-full items-center gap-3 pt-3 pb-4 px-4 sm:px-8">
          <div className="w-full max-w-full">
            <h1 className="text-center font-sans font-bold text-3xl pb-4 pt-4">
              New Launch Alert.
              <br />
              Ready. Set. Get.
            </h1>

            {/* Mobile layout */}
            <div className="flex flex-col items-center gap-3 sm:hidden">
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 border-blue-100 border-2 rounded-4xl overflow-hidden shadow-[-5px_10px_5px] shadow-blue-200">
                  <img src={logoImage} className="w-full h-full object-contain" alt="SutiExpense" />
                </div>

                <div className="flex justify-center items-center">
                  <a href="https://play.google.com/store/apps/details?id=com.sutisoft.SutiExpense&hl=en_US" target="_blank"><img src={playBadge} className="h-9 w-30 mr-1 cursor-pointer" alt="Get it on Google Play" /></a>
                  <a href="https://apps.apple.com/us/app/sutiexpense/id562877498" target="_blank"><img src={appleBadge} className="h-9 w-30 ml-1 cursor-pointer" alt="Download on the App Store" /></a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <a href="#gettingStarted" className="buttonBorders bg-[#007bff]" style={{ color: 'white' }}>
                  Getting Started
                </a>
                <a href="#deadlines" className="buttonBorders bg-[#007bff]" style={{ color: 'white' }}>
                  Deadlines
                </a>
                <a href="#faq" className="buttonBorders bg-[#1a56ff]" style={{ color: 'white' }}>
                  FAQ
                </a>
                <a href="#rules" className="buttonBorders bg-[#1a56ff]" style={{ color: 'white' }}>
                  Rules
                </a>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:flex justify-center items-center gap-6">
              <div className="flex flex-col gap-3 w-32">
                <a href="#gettingStarted" className="buttonBorders bg-[#007bff]" style={{ color: 'white' }}>
                  Getting Started
                </a>
                <a href="#faq" className="buttonBorders bg-[#1a56ff]" style={{ color: 'white' }}>
                  FAQ
                </a>
              </div>

              <div className="flex justify-center items-center shrink-0">
                <div className="w-44 h-44 border-blue-100 border-2 rounded-4xl overflow-hidden shadow-[-5px_10px_5px] shadow-blue-200">
                  <img src={logoImage} className="w-full h-full object-contain" alt="SutiExpense" />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-32">
                <a href="#deadlines" className="buttonBorders bg-[#007bff]" style={{ color: 'white' }}>
                  Deadlines
                </a>
                <a href="#rules" className="buttonBorders bg-[#1a56ff]" style={{ color: 'white' }}>
                  Rules
                </a>
              </div>
            </div>
          </div>

          {/* Desktop badges */}
          <div className="hidden sm:flex justify-center items-center py-1">
            <a href="https://play.google.com/store/apps/details?id=com.sutisoft.SutiExpense&hl=en_US" target="_blank"><img src={playBadge} className="h-13 w-40 mr-1 cursor-pointer" alt="Get it on Google Play" /></a>
            <a href="https://apps.apple.com/us/app/sutiexpense/id562877498" target="_blank"><img src={appleBadge} className="h-14 w-40 ml-1 cursor-pointer" alt="Download on the App Store" /></a>
          </div>
        </div>

        {/* <FIXME></FIXME> */}
        <div className="scroll-m-20 infoContainer !text-center">
            <h2>What is SutiExpense used for?</h2>
            <p>SutiExpense is used to capture receipts, create expense reports, 
              submit expenses and mileage for approval, track reimbursement status,
               and manage travel-related expenses.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-[90%] mx-auto">
          <div id="gettingStarted" className="scroll-m-20 infoContainer" style={{ width: '100%', alignSelf: 'stretch' }}>
            <h2>How do I download SutiExpense?</h2>
            <p>Download SutiExpense by clicking one of the two links above.</p>

            <h2 className="mt-4">How do I access SutiExpense?</h2>
            <p>Once you have the app, you can access SutiExpense directly by the app, or within Confluence.</p>
          </div>

          <div className="infoContainer" style={{ width: '100%', alignSelf: 'stretch' }}>
            <h2>How do I log in?</h2>
            <p>After opening the app: </p>

            <ol className="font-bold">
              <li>Ignore the first login screen.</li>
              <li>Swipe left to access the Single Sign-On (SSO) page.</li>
              <li>Log in using your Marquette SSO credentials (the same login used for Confluence).</li>
            </ol>

            <p>
              Watch a quick login demo here:{' '}
              <a className="textLink" href="ok">
                Login Demo Link
              </a>
            </p>
          </div>
        </div>

        <h1 id="faq" className="scroll-m-20 self-center pb-5 text-center font-sans font-bold text-2xl">
          Frequently Asked Questions
        </h1>


        <div className="infoContainer text-center" style={{ width: '90%', alignSelf: 'center' }}>
          <h2>How do I submit an expense report?</h2>
          <div className="flex flex-col md:flex-row gap-4 w-[90%] mx-auto text-center mt-2">
            <div style={{ width: '90%', alignSelf: 'center' }}>
              <p>To create and submit an expense report: </p>
              <ol className="font-bold list-none! ml-0!">
                <li>Create a new report</li>
                <li>Enter the details of the report</li>
                <li>Add expenses and receipts</li>
                <li>Submit for approval when ready</li>
              </ol>
            </div>
            <div style={{ width: '90%', alignSelf: 'center' }}>
              <p>To create and submit a mileage expense report:</p>
              <ol className="items-center font-bold list-none! ml-0!">
                <li>Create a new report</li>
                <li>Enter trip details</li>
                <li>Submit for approval when ready</li>
              </ol>
            </div>
          </div>
          
          <br />
          <p>Step-by-step training is available through your assigned eLearnings.</p>

          <p>
            You can also view a quick demo here:{' '}
            <a className="textLink" href="ok">
              Expense Report Link
            </a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-[90%] mx-auto">
          <div className="infoContainer" style={{ width: '100%', alignSelf: 'stretch' }}>
            <h2>How do I navigate the SutiExpense app?</h2>

            <p>
            Use the main menu to Create a New Expense Report, access Expense Report Drafts, Receipts, Submitted Expense Reports, and Settings.
            <br /><br />All employees have been assigned SutiExpense eLearnings. Please complete them here:{' '}
              <a className="textLink" href="https://marquette.sci-training.org/login/index.php">
                SutiExpense eLearnings
              </a>
            </p>

            <p><br />If you have additional questions, contact your Crew Manager or Makenzie Davis.</p>
          </div>
          <div className="infoContainer" style={{ width: '100%', alignSelf: 'stretch' }}>
            <h2>How can I ensure timely reimbursement?</h2>
            <p>Expenses will be reimbursed on the 7th and the 22nd as a separate deposit from payroll.</p>
            <p><br />To help ensure your expenses are processed quickly, please submit receipts by the 12th of each month or at least 3 days before month-end.</p>
          </div>
        </div>

        <div id="deadlines" className="scroll-m-20 infoContainer">
          <h2>When do we have to fully transition to SutiExpense?</h2>
          <p>Beginning July 1, we strongly encourage all employees to download SutiExpense, begin collecting photos of receipts and start submitting expense reports through the app. </p>
          <br />
          <p>We understand that transitioning from a paper process to a digital platform takes time to adjust, so a two-month grace period will be in place where both Suti and paper expense reports will be accepted (submit one or the other, not both).</p>
          <br />

          <p>
            Starting September 1, all expense submissions <b>MUST</b> be completed through SutiExpense.
          </p>
          <p>At that time, paper expense reports will be officially retired, and reimbursement requests submitted on paper will be returned to the sender.</p>
        </div>

        <div id="rules" className="scroll-m-20 infoContainer">
          <h2>Are there rules or guidelines I need to follow?</h2>
          <p>Yes. SutiExpense follows Marquette's expense reimbursement policies. Please review them here: <a className="textLink" target="_blank" href="HR15 - Travel Expense Policy (2-2025).pdf">Expense Reimbursement Policy</a></p>
          <p>A few key reminders:</p>
          <ul>
            <li>Expenses must be reported and receipts must be submitted within 60 days of the expense date</li>
            <li>Mileage only paid in the River Division</li>
            <li>No mileage payment if LT 50 miles</li>
            <li>Cooks and Deck roles are capped at a $200 mileage reimbursement limit</li>
            <li>No mileage cap for wheelhouse or engineering personnel. 
              <ul>
                <li className="list-[circle]">Wheelmen and engineers can NOT claim both mileage and gas.</li>
                <li className="list-[circle]">If using a rental car, only gas receipts will be approved.</li>
              </ul>
            </li>
            <li>Itemized receipts required for all expenses except mileage</li>
            <li>No alcohol</li>
          </ul>
        </div>
        <div className="infoContainer">
          <h2>What information should be visible on a receipt?</h2>
          <p>Merchant name, transaction date, amount paid, and itemized details. 
            <br /><span className="underline"> Blurry, incomplete, or unreadable receipts may be rejected during the approval process.</span></p>
        </div>
        <div className="infoContainer">
          <h2>How do I capture a receipt using my phone camera?</h2>
          <p>Within the app you can either:</p>
          <ul>
            <li>Use the camera icon to take a photo as you submit your report</li>
            <li>Upload a photo from your phone's gallery</li>
            <li>Or upload an existing photo into your “My Receipts” Repository - a centralized location where uploaded and captured receipts are stored in the app.</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-[90%] mx-auto">
          <div className="infoContainer" style={{ width: '100%', alignSelf: 'stretch' }}>
            <h2>How does the approval process work?</h2>
            <p>Reports are routed to the appropriate approver who review and either approve or reject them.</p>
          </div>
          <div className="infoContainer" style={{ width: '100%', alignSelf: 'stretch' }}>
            <h2>What if my expense report is rejected?</h2>
            <p>The approver provides comments explaining the reason for rejection and whether or not it can be edited and resubmitted.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App