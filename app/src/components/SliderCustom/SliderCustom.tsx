import classes from './Slider.module.css'
import * as Slider from '@radix-ui/react-slider';

function SliderCustom({
  ...props
}) {
  return <Slider.Root
    {...props}
    className={classes.SliderRoot}
  >
    <Slider.Track className={classes.SliderTrack}>
      <Slider.Range className={classes.SliderRange} />
    </Slider.Track>
    <Slider.Thumb className={classes.SliderThumb} aria-label="Volume" />
  </Slider.Root>
    ;
}

export default SliderCustom;
