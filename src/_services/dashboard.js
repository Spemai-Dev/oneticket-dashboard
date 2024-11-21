import { get,unauth_add} from "./common"
export const sign=async(body)=>{
    return await unauth_add("organization/portal/login/",body)
}
export const getALLevent = async () => {
    try {
      const data = await get('organization/dashboard/events/');
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}
export const getEventDetails = async (eventId) => {
    try {
      const data = await get(`organization/dashboard/event-detail/?id=${eventId}`);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}
// export const getPartiDetails = async (eventId) => {
//     try {
//       const data = await get(`organization/dashboard/event-participants/?id=${eventId}`);
//       return data;
//       // Process the received data
//     } catch (error) {
//       // Handle error here
//       return error;
//     }
// }
export const getPartiDetails =async(params)=>{
  return await get("organization/dashboard/event-participants/?" + params)
}
export const getDetailsById =async(params)=>{
  return await get("organization/dashboard/event-participant-detail/?" + params)
}
export const getEventS =async(params)=>{
  return await get("organization/dashboard/event-checking-status/?" + params)
}
export const geteventVolume = async (eventId) => {
    try {
      const data = await get(`organization/dashboard/event-volume/?id=${eventId}`);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}