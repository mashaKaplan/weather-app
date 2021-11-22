export const API_KEY = 'aLaVstXS3Ae7xiWbAB6twj0rQFXQL8U0';
export const IP_KEY = '61fcb5b3c2b71e37cdadc29018db2a32';


export interface WeatherItem {
  Date: string,
  EpochDate: number,
  Temperature: {
    Minimum: {
      Value: number,
      Unit: 'C' | 'F',
      UnitType: number
    },
    Maximum: {
      Value: number,
      Unit: 'C' | 'F',
      UnitType: number
    }
  },
  Day: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  },
  Night: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  },
  Sources: string[],
  MobileLink: string,
  Link: string
}

export interface LocationItem {
  city: string,
  key: string,
  currentTempValue?: number,
  currentTempType?: string,
  currentTempDescription?: string,
  currentTempIcon?: number,
  isFavorite?: boolean
}
