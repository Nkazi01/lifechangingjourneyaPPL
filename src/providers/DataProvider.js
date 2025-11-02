import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../utils/constants';

const STORAGE_KEYS = Constants.STORAGE_KEYS;
const CACHE_DURATION = Constants.CACHE_DURATION;
import { checkNetworkStatus } from '../utils/networkUtils';
import { staticData } from '../utils/staticData';

const staticServices = staticData.services;
const staticResources = staticData.resources;
const staticTestimonials = staticData.testimonials;

const DataContext = createContext({});

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [resources, setResources] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Load cached data on mount
  useEffect(() => {
    loadCachedData();
    checkNetworkStatus().then(setIsOnline);
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_DATA);
      const cacheTimestamp = await AsyncStorage.getItem(STORAGE_KEYS.CACHE_TIMESTAMP);

      if (cachedData && cacheTimestamp) {
        const timestamp = parseInt(cacheTimestamp, 10);
        const now = Date.now();

        // Use cache if it's less than CACHE_DURATION old
        if (now - timestamp < CACHE_DURATION) {
          const parsed = JSON.parse(cachedData);
          setServices(parsed.services || staticServices);
          setResources(parsed.resources || staticResources);
          setTestimonials(parsed.testimonials || staticTestimonials);
          setLastUpdate(new Date(timestamp));
          setLoading(false);
          return;
        }
      }

      // Fallback to static data
      setServices(staticServices);
      setResources(staticResources);
      setTestimonials(staticTestimonials);
      setLoading(false);
    } catch (error) {
      console.error('Error loading cached data:', error);
      // Use static data as fallback
      setServices(staticServices);
      setResources(staticResources);
      setTestimonials(staticTestimonials);
      setLoading(false);
    }
  };

  const saveCache = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(data));
      await AsyncStorage.setItem(STORAGE_KEYS.CACHE_TIMESTAMP, Date.now().toString());
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  };

  const fetchData = async () => {
    const online = await checkNetworkStatus();
    setIsOnline(online);

    if (!online) {
      // Use cached or static data when offline
      loadCachedData();
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API calls when backend is ready
      // const servicesData = await fetchServices();
      // const resourcesData = await fetchResources();
      // const testimonialsData = await fetchTestimonials();

      // For now, use static data
      const data = {
        services: staticServices,
        resources: staticResources,
        testimonials: staticTestimonials,
      };

      setServices(data.services);
      setResources(data.resources);
      setTestimonials(data.testimonials);

      // Cache the data
      await saveCache(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to cached or static data
      loadCachedData();
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    return fetchData();
  };

  const value = {
    services,
    resources,
    testimonials,
    loading,
    isOnline,
    lastUpdate,
    refreshData,
    fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;

