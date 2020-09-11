const BANNER_TYPES = {
  ALERT: 'alert',
  ERROR: 'error',
  WARNING: 'warning',
  UNSATISFIED: 'unsatisfied',
  UNVERIFIED: 'unverified',
  ADVISORY: 'advisory',
};

const defaultBannerPriority = [
  BANNER_TYPES.ALERT,
  BANNER_TYPES.ERROR,
  BANNER_TYPES.WARNING,
  BANNER_TYPES.UNSATISFIED,
  BANNER_TYPES.UNVERIFIED,
  BANNER_TYPES.ADVISORY,
];

const organizeBannersByPriority = (banners) => {
  if (!banners) {
    return [];
  }

  const bannersList = defaultBannerPriority.reduce((coll, type) => {
    if (banners[type]) {
      // eslint-disable-next-line compat/compat
      const registeredBannersForType = Object.values(banners[type]);
      registeredBannersForType.map(registeredBannerProps => coll.push(registeredBannerProps));
    }

    return coll;
  }, []);

  return bannersList;
};

export { organizeBannersByPriority };
export { BANNER_TYPES };
