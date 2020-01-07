const RC = require('parse-strings-in-object')(require('rc')('EVENT_SDK', require('../../config/default.json')))

type ConfigType = {
  ASYNC_OVERRIDE_EVENTS: string,
  EVENT_LOGGER_SERVER_HOST: string,
  EVENT_LOGGER_SERVER_PORT: number,
  EVENT_LOGGER_SIDECAR_DISABLED: boolean,
  EVENT_LOGGER_SIDECAR_WITH_LOGGER: boolean,
  EVENT_LOGGER_VENDOR_PREFIX: string,
  EVENT_LOGGER_TRACESTATE_HEADER_ENABLED: boolean,
  EVENT_LOGGER_LOG_FILTER: Array<string>,
  EVENT_LOGGER_LOG_METADATA_ONLY: boolean,
  EVENT_LOGGER_TRACEID_PER_VENDOR: boolean

}

const Config: ConfigType = {
  ASYNC_OVERRIDE_EVENTS: RC.ASYNC_OVERRIDE_EVENTS,
  EVENT_LOGGER_SERVER_HOST: RC.SERVER_HOST,
  EVENT_LOGGER_SERVER_PORT: RC.SERVER_PORT,
  EVENT_LOGGER_SIDECAR_DISABLED: RC.SIDECAR_DISABLED,
  EVENT_LOGGER_SIDECAR_WITH_LOGGER: RC.SIDECAR_WITH_LOGGER,
  EVENT_LOGGER_VENDOR_PREFIX: RC.VENDOR_PREFIX,
  EVENT_LOGGER_TRACESTATE_HEADER_ENABLED: RC.TRACESTATE_HEADER_ENABLED,
  EVENT_LOGGER_LOG_FILTER: RC.LOG_FILTER,
  EVENT_LOGGER_LOG_METADATA_ONLY: RC.LOG_METADATA_ONLY,
  EVENT_LOGGER_TRACEID_PER_VENDOR: RC.TRACEID_PER_VENDOR


}


export default Config