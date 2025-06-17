'use client'

import { PRICING_PLANS } from '@/constants/pricing'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import { useState } from 'react'
import AnimationContainer from '../global/animation-container'
import Wrapper from '../global/wrapper'
import { Button } from '../ui/button'
import SectionBadge from '../ui/section-badge'
import NumberFlow from '@number-flow/react'

const Pricing = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false)

  return (
    <Wrapper className="py-20 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <SectionBadge title="Pricing" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <h2 className="from-foreground bg-gradient-to-b to-neutral-400 bg-clip-text text-2xl !leading-tight font-medium text-transparent md:text-4xl lg:text-5xl">
            Choose your perfect plan
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
            Select a plan that best suits your real estate business needs
          </p>
        </AnimationContainer>
      </div>

      <AnimationContainer animation="fadeUp" delay={0.5}>
        <div className="flex items-center justify-center gap-4 pt-10">
          <button
            onClick={() => setIsYearly(false)}
            className={cn(
              'text-sm font-medium transition-colors',
              !isYearly ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Monthly
          </button>
          <div
            onClick={() => setIsYearly(!isYearly)}
            className="h-6 w-11 cursor-pointer rounded-full bg-neutral-800 p-1 transition-colors duration-300"
          >
            <div
              className={cn(
                'from-primary h-4 w-4 rounded-full bg-gradient-to-b to-neutral-400 transition-transform duration-300',
                isYearly && 'translate-x-5',
              )}
            />
          </div>
          <button
            onClick={() => setIsYearly(true)}
            className={cn(
              'text-sm font-medium transition-colors',
              isYearly ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Yearly
          </button>
        </div>
      </AnimationContainer>

      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {PRICING_PLANS.map((plan, index) => (
          <AnimationContainer key={index} animation="fadeUp" delay={0.6 + index * 0.2}>
            <div
              className={cn(
                'relative flex flex-col overflow-hidden rounded-3xl p-8 backdrop-blur-3xl',
                plan.popular && 'bg-[#181818]',
                !plan.popular && 'bg-gradient-to-b from-[#181818] to-[#101010]/0',
              )}
            >
              {plan.popular && (
                <>
                  <div className="absolute inset-x-0 -top-1/8 -z-10 mx-auto size-40 rounded-full bg-[#f10a0a] blur-[5rem]" />
                  <div className="absolute inset-x-0 top-0 mx-auto h-px w-4/5 bg-gradient-to-r from-[#f10a0a]/0 via-[#f10a0a] to-[#f10a0a]/0"></div>
                </>
              )}

              <AnimationContainer animation="fadeUp" delay={0.7 + index * 0.2}>
                <div className="mb-8">
                  <h3 className="mb-2 text-xl font-medium">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
              </AnimationContainer>

              <AnimationContainer animation="fadeUp" delay={0.8 + index * 0.2}>
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-4xl font-medium text-[#f10a0a]">₹</span>
                  <span className="text-5xl font-medium text-[#f10a0a]">
                    <NumberFlow value={isYearly ? plan.price.yearly : plan.price.monthly} />
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </AnimationContainer>

              <div className="flex-1">
                <AnimationContainer animation="fadeUp" delay={0.9 + index * 0.2}>
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="text-primary h-5 w-5" />
                        ) : (
                          <X className="text-muted-foreground h-5 w-5" />
                        )}
                        <span
                          className={cn(
                            'text-sm',
                            feature.included ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AnimationContainer>
              </div>

              <AnimationContainer animation="fadeUp" delay={1 + index * 0.2}>
                <Button
                  variant={plan.popular ? 'default' : 'secondary'}
                  className="w-full bg-[#f10a0a]"
                >
                  Get Started
                </Button>
              </AnimationContainer>
            </div>
          </AnimationContainer>
        ))}
      </div>
    </Wrapper>
  )
}

export default Pricing
