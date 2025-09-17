import React from 'react'
import HeroHeading from './HeroHeading'
import FeatureResuableComponent from './FeatureResuableComponent'
import FeatureCards from './FeatureCards'

const FeaturesSection = () => {
    return (
        <div id='features' className='mt-36 scroll-mt-24'>
            <FeatureResuableComponent
                title={"Powerful Features for"}
                highlight={"Civic Change"}
                subtitle={"Clean Street provides everything you need to report, track, and resolve local issues efficiently while building stronger community connections."}
            />

            <FeatureCards />
        </div>
    )

}
export default FeaturesSection