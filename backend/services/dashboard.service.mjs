// backend/services/dashboard.service.mjs
import * as dashboardRepository from '../repository/dashboard.repository.mjs';

export async function getDashboardIndicators() {
  try {
    const totalMovies = await dashboardRepository.getTotalMoviesCount();
    const totalRooms = await dashboardRepository.getTotalRoomsCount();
    const availableRooms = await dashboardRepository.getAvailableRoomsCount();

    return {
      totalMovies: totalMovies,
      totalRooms: totalRooms,
      availableRooms: availableRooms,
    };
  } catch (error) {
    console.error('Error en dashboard.service.getDashboardIndicators:', error);
    throw error;
  }
}